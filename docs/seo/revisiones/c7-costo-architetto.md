# Revisión — `seo/c7-costo-architetto`

Guía **"Quanto costa un architetto per ristrutturare casa"** en `/news/quanto-costa-un-architetto-ristrutturazione`. Responde a la duda que frena a muchos clientes antes de contactar. Brief: [`C7`](../briefs/C7-quanto-costa-un-architetto.md).

## Qué se ha hecho

- Guía en italiano (~1.000 palabras) en primera persona, con la estructura del brief:
  1. Respuesta directa (5–15 % de la obra, 7–12 % en una reforma integral).
  2. Cómo se calcula: tabla de los tres métodos (porcentaje, precio cerrado, por horas), honorarios libres desde 2012, el DM 140/2012 como referencia judicial.
  3. Qué se paga en cada una de las 5 fases de su servicio.
  4. Ejemplo de 80 m² (LOVINGCOLORS).
  5. Encargar solo una parte.
  6. Deducibilidad, sin porcentajes.
  7. Cómo comparar dos presupuestos.
  8. Cuándo conviene y cuándo basta con ArchiAdvice o un restyling.
  9. 4 preguntas frecuentes.
- Traducción al español y al inglés.
- Enlaza con la guía C11 (coste de la obra) y con los servicios C4, C2 y C6. Si alguno no está publicado, el enlace va a `/news` o a `/servizi`.

**Archivos:** `content/news/{it,es,en}/quanto-costa-un-architetto-ristrutturazione.mdx`.

**De dónde salen las cifras:** los rangos de mercado del brief (Spazi Belli, Vitae Studio, CalcolaParcella), con fecha. Las fases salen de la descripción de su servicio en `/servizi`. **No hay ninguna cifra de Martina:** su método, el peso de cada fase y el ejemplo están marcados.

## Cómo verlo

Preview o `npm run dev` → http://localhost:3000/news/quanto-costa-un-architetto-ristrutturazione. En producción no se publica mientras haya marcadores.

## Qué validar

**Martina: datos pendientes (5 por idioma)**
- [ ] **¿Quiere publicar cómo calcula sus honorarios?** (porcentaje, precio cerrado por fases o mixto) y un rango orientativo. Es la decisión que más pesa en esta guía: el brief la señala como el bloqueo principal.
- [ ] Peso orientativo de cada fase en el total.
- [ ] Ejemplo de LOVINGCOLORS (importe de obra y honorarios, con permiso del cliente) o un ejemplo tipo.
- [ ] Cómo organiza los pagos.
- [ ] ¿El primer encuentro o la primera visita es gratuito? (es la misma pregunta que en la reforma C4)

**Martina: contenido**
- [ ] Afirmaciones profesionales: honorarios libres desde 2012; el DM 140/2012 como referencia para liquidaciones judiciales; los gastos técnicos siguen la deducción de la obra; arquitecto y geometra pueden firmar los trámites de muchas obras en un piso.
- [ ] Traducciones.

**Daniel**
- [ ] Verificado en local el 10 oct: 200 en it/es/en; title correcto; 5 marcadores por idioma; una tabla.

## Cómo mergear

Después de `feat/seo-fase-2-pr2` (`ec225b1`). Antes del merge, sustituir todos los `[DA CONFERMARE: …]`. Conviene publicarla junto con C11, porque se enlazan entre sí.
