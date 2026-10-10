#!/bin/bash
# Simulacro de merge (A7): junta main + seo/preview-completa en un worktree aparte, compila
# en modo producción y comprueba conflictos, redirecciones, sitemap y enlaces internos.
# No toca ninguna rama ni sube nada. Uso: bash docs/seo/auditorias/2026-10-10-simulacro-merge/simulacro.sh
set -u
REPO=$(git rev-parse --show-toplevel); cd "$REPO"
WT=${TMPDIR:-/tmp}/simulacro-merge; PORT=3107; H=http://localhost:$PORT
export GIT_AUTHOR_NAME=sim GIT_AUTHOR_EMAIL=sim@local GIT_COMMITTER_NAME=sim GIT_COMMITTER_EMAIL=sim@local

echo "== 1. Conflictos =="
T=$(git merge-tree --write-tree main seo/preview-completa) || { echo "CONFLICTO main + preview-completa"; exit 1; }
BASE=$(git commit-tree "$(git merge-tree --write-tree main feat/seo-fase-2-pr2)" -p main -p feat/seo-fase-2-pr2 -m base)
CUR=$BASE
for b in $(git for-each-ref --format='%(refname:short)' refs/heads/seo/ | grep -v preview-completa); do
  git merge-tree --write-tree --name-only "$BASE" "$b" >/dev/null 2>&1 || echo "CONFLICTO sola: $b"
  t=$(git merge-tree --write-tree "$CUR" "$b" 2>/dev/null) && CUR=$(git commit-tree "$t" -p "$CUR" -p "$b" -m "$b") || echo "CONFLICTO secuencial: $b"
done
[ "$(git rev-parse "$CUR^{tree}")" = "$T" ] && echo "rama a rama = preview-completa: idéntico" || echo "AVISO: rama a rama difiere de preview-completa"

echo "== 2. Build en modo producción =="
C=$(git commit-tree "$T" -p main -p seo/preview-completa -m simulacro)
git worktree remove --force "$WT" 2>/dev/null; git worktree add -q --detach "$WT" "$C"
cp .env.local "$WT"/ 2>/dev/null; cd "$WT"
npm ci --no-audit --no-fund >/dev/null 2>&1 && VERCEL_ENV=production npm run build > build.log 2>&1 || { echo "BUILD FALLIDO: $WT/build.log"; exit 1; }
grep -q MISSING_MESSAGE build.log && echo "AVISO: MISSING_MESSAGE en build.log"
(VERCEL_ENV=production PORT=$PORT npm run start > start.log 2>&1 &)
for _ in $(seq 30); do curl -s -o /dev/null $H/ && break; sleep 1; done

echo "== 3. Redirecciones =="
for p in /proyectos /proyectos/cucina-mite /servicios /sobre-mi /contacto /en/proyectos /en/proyectos/cucina-mite /en/servicios /en/sobre-mi /en/contacto /progetti/cucina-MITE /Servizi; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' $H$p) | final $(curl -sL -o /dev/null -w '%{http_code}' $H$p)"
done

echo "== 4. Sitemap local y de producción =="
path() { local p=${1#https://mparchistudio.com}; echo "${p:-/}"; }
curl -s $H/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' > local.txt
curl -s https://mparchistudio.com/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' > prod.txt
echo "local: $(wc -l < local.txt) URLs · producción hoy: $(wc -l < prod.txt) URLs"
while read -r u; do c=$(curl -s -o /dev/null -w '%{http_code}' "$H$(path "$u")"); [ "$c" = 200 ] || echo "  sitemap local $c $(path "$u")"; done < local.txt
while read -r u; do c=$(curl -sL -o /dev/null -w '%{http_code}' "$H$(path "$u")"); [ "$c" = 200 ] || echo "  URL de producción $c $(path "$u")"; done < prod.txt

echo "== 5. Enlaces internos y marcadores =="
while read -r u; do curl -s "$H$(path "$u")"; done < local.txt > pages.html
grep -c "DA CONFERMARE" pages.html | sed 's/^/marcadores visibles: /'
grep -oE 'href="/[^"#?]*"' pages.html | sed 's/href="//;s/"$//' | sort -u | grep -vE '^/(_next|_vercel|images|videos|icon)' > links.txt
while read -r l; do c=$(curl -s -o /dev/null -w '%{http_code}' "$H$l"); [ "$c" = 200 ] || echo "  enlace $c $l"; done < links.txt
echo "enlaces comprobados: $(wc -l < links.txt)"

lsof -ti:$PORT | xargs kill 2>/dev/null; cd "$REPO"; git worktree remove --force "$WT"
