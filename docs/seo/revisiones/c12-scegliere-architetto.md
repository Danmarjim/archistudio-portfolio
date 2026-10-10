# Revisión — `seo/c12-scegliere-architetto`

Guía **"Come scegliere un architetto per ristrutturare casa (e quando non serve)"** en `/news/come-scegliere-architetto-ristrutturazione`. La lee quien está a punto de contratar a alguien para su reforma. Brief: [`C12`](../briefs/C12-come-scegliere-architetto.md).

## Qué se ha hecho

- Guía en italiano (~1.260 palabras) en primera persona, con la estructura del brief:
  1. Respuesta directa: proyectos parecidos, presupuesto por fases y quién controla la obra.
  2. Tabla comparativa de **arquitecto, geometra, empresa llave en mano e interiorista**: qué hace cada uno, quién firma los trámites, quién controla la obra, cómo se paga y cuándo conviene. Es el hueco que no cubre ningún competidor.
  3. Qué hace un arquitecto: sus 5 fases, las mismas que en `/servizi`.
  4. Cómo leer un portfolio (5 criterios).
  5. Tabla de 8 preguntas para la primera reunión, cada una con la respuesta que debería tranquilizar.
  6. Señales de alarma.
  7. Cuándo no hace falta un arquitecto: restyling, ArchiAdvice, empresa directamente o asesoría de compra.
  8. Contrato y presupuesto: presupuesto escrito obligatorio con datos de la póliza.
  9. 4 preguntas frecuentes.
- Traducción al español y al inglés. En ambas se explica qué es un geometra.
- `seoTitle` y `description` del brief. La portada es una vista de la vivienda entera de Casa Archi & Colori (`casa-archi-colori-15.jpg`).
- Enlaces internos:
  - **Servicios**: reforma (C4), ArchiAdvice (C2) y restyling (C6). Si un servicio no está publicado, el enlace va al hub `/servizi`.
  - **Guías**: C7 y C11. Si una guía no está publicada, el enlace va a `/news`.
  - **Otras páginas**: `/progetti`, `/chi-sono` y contacto.

**Archivos:** `content/news/{it,es,en}/come-scegliere-architetto-ristrutturazione.mdx`.

**Pendiente para el final de la fase 2:** los enlaces **hacia** esta guía desde C4 y C7 ("come scegliere l'architetto"). Se harán de una vez para todas las guías nuevas, cuando estén redactadas.

## Cómo verlo

Preview de `seo/preview-completa` o `npm run dev` → http://localhost:3000/news/come-scegliere-architetto-ristrutturazione. En producción no se publica mientras haya marcadores.

## Qué validar

**Martina: datos pendientes (4 por idioma)**
- [ ] Las preguntas que más le hacen los clientes en la primera reunión, para completar o cambiar la tabla.
- [ ] Qué incluye siempre por escrito en su encargo.
- [ ] Número de colegiada (el mismo dato que en C1, C2, C3 y C4).
- [ ] ¿La primera reunión o visita es gratuita? (la misma pregunta que en C4 y C7)

**Martina: contenido**
- [ ] **Tono de la tabla comparativa**: que sea justo con el geometra, la empresa llave en mano y el interiorista. Una guía que parezca publicidad pierde la confianza que busca.
- [ ] Afirmaciones profesionales:
  - el geometra puede firmar los trámites de la mayoría de las obras en un piso;
  - la restauración de edificios protegidos como bienes culturales está reservada al arquitecto (RD 2537/1925, art. 52);
  - el interiorista no puede firmar trámites;
  - el presupuesto escrito con los datos de la póliza es obligatorio (DL 1/2012, art. 9, modificado por la ley 124/2017);
  - un trámite mal hecho puede bloquear una venta o una deducción.
- [ ] Traducciones.

**Daniel**
- [ ] Verificado en local el 10 oct: 200 en it/es/en; title correcto; 8 H2, 2 tablas y 4 marcadores por idioma; build y `tsc` limpios.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir todos los `[DA CONFERMARE: …]`. Conviene publicarla después de C4 y C7, o a la vez, porque se apoya en ellas.
