# Revisión — `seo/c8-conformita-urbanistica`

Guía **"Conformità urbanistica e catastale: cosa controllare prima di comprare casa"** en `/news/conformita-urbanistica-catastale-prima-di-comprare-casa`. La guía **informa**; la asesoría de compra (C3) **vende** la comprobación, y la guía termina enlazando a ella. Brief: [`C8`](../briefs/C8-conformita-urbanistica-catastale.md).

**Es la guía con más riesgo legal de la web.** No se publica sin la revisión técnica completa de Martina.

## Qué se ha hecho

- Guía en italiano (~1.300 palabras) en primera persona, con la estructura del brief:
  1. Respuesta directa: qué es cada conformidad y por qué hay que comprobar las dos.
  2. Aviso visible: guía informativa, actualizada a octubre de 2026.
  3. **Tabla de diferencias** urbanística/catastral: qué compara cada una, para qué sirve, qué se declara al notario y qué pasa si falla.
  4. Stato legittimo, edificios anteriores a 1967, agibilità (no sustituye a la conformidad) y tolerancias (Salva Casa 2024).
  5. **Checklist en tabla**: cada documento con dónde está y quién puede pedirlo.
  6. **Cuándo hacerla**: antes de la oferta, en la oferta (condición suspensiva), antes del preliminar y antes de la escritura.
  7. Irregularidades más comunes en pisos, sin cifras de sanciones.
  8. **Conformidad y reforma futura**: el ángulo propio de una arquitecta que reforma.
  9. Quién hace la comprobación y qué debe incluir.
  10. 4 preguntas frecuentes.
- **Sin precio**: no encontré una fuente fiable (las estimaciones van de 300 € a mínimos de 3.500 €). El precio va en C3, que tiene su propio `[DA CONFERMARE]`.
- Traducción al español y al inglés. Los términos italianos se mantienen con su explicación: el trámite solo existe en Italia.
- Enlaces internos: C3, C4, C2 y C11. Si alguno no está publicado, va al hub correspondiente.

**Archivos:** `content/news/{it,es,en}/conformita-urbanistica-catastale-prima-di-comprare-casa.mdx`.

**Pendiente para el final de la fase 2:** los enlaces **hacia** esta guía desde C3 ("la checklist completa della conformità") y C11.

## Cómo verlo

Preview de `seo/preview-completa` o `npm run dev` → http://localhost:3000/news/conformita-urbanistica-catastale-prima-di-comprare-casa. En producción no se publica mientras haya marcadores.

## Qué validar

**Martina: revisión técnica (imprescindible)**

Cada afirmación legal y su fuente:

| Afirmación | Referencia |
|---|---|
| Al notario, el vendedor declara los datos de los títulos de obra | Art. 46 DPR 380/2001 |
| Declaración de conformidad catastal del plano y los datos | Art. 29, c. 1-bis, ley 52/1985 |
| Definición de stato legittimo y, para los edificios sin título obligatorio, los documentos alternativos | Art. 9-bis, c. 1-bis, DPR 380/2001 |
| Antes del 1/9/1967, fuera de los núcleos urbanos, a menudo no hacía falta licencia | Ley 765/1967 |
| La agibilità (SCA) no sustituye a la conformidad | Art. 24 DPR 380/2001 |
| Tolerancias del 2 al 6 % según la superficie, para obras realizadas hasta el 24/5/2024 (Salva Casa) | Art. 34-bis DPR 380/2001, DL 69/2024 convertido por la ley 105/2024. Conviene comprobar el texto vigente en Normattiva |
| El accesso agli atti tiene un plazo legal de 30 días | Ley 241/1990 |
| La escritura es válida si cita un título real y referido a la casa, aunque haya irregularidades | Cass. SS.UU. 8230/2019 |
| El plano catastal solo lo puede pedir el propietario o alguien autorizado por él; la visura, cualquiera | Agenzia delle Entrate |
| El APE es obligatorio para vender | D.Lgs. 192/2005 |

**Martina: datos pendientes (4 por idioma)**
- [ ] Plazos reales del accesso agli atti en Bergamo, Milán y Monza.
- [ ] Qué documentos pide al cliente o a la agencia para empezar.
- [ ] Las irregularidades que más se encuentra.
- [ ] Plazo típico de una comprobación completa (la misma pregunta que en C3).

**Martina: contenido**
- [ ] Tono: claro sin alarmar.
- [ ] Traducciones, sobre todo los términos legales en español e inglés.

**Daniel**
- [ ] Verificado en local el 10 oct: 200 en it/es/en; title correcto; 8 H2, 2 tablas y 4 marcadores por idioma; build y `tsc` limpios.

## Cómo mergear

Después de `feat/seo-fase-2-pr2` y, mejor, a la vez que C3, porque se enlazan entre sí. Antes del merge, sustituir todos los `[DA CONFERMARE: …]` y tener la revisión técnica hecha. **Revisar la guía cada 6–12 meses** por los cambios de normativa.
