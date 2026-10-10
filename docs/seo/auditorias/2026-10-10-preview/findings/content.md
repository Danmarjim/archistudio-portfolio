# Contenido y E-E-A-T — páginas nuevas (A1)

10 oct 2026, con `claude-seo:seo-content` sobre la build local de `seo/preview-completa`. Páginas: los 4 servicios, las 2 guías de costes, la home y chi sono (italiano; es/en revisados para las mismas correcciones). Las notas son heurísticas de la skill, no señales internas de Google.

## Nota de contenido: 74/100 (→ ~85 con los datos de Martina)

| Factor | Nota | Señales |
|---|---|---|
| Experiencia | 15/20 | Casos reales con datos (LOVINGCOLORS, CASA PEONIA, cocinas MITE y PARIGINA); faltan fotos del antes, cifras de obra y testimonios |
| Pericia | 20/25 | Formación y colegiación visibles, proceso detallado con entregables, explicación de trámites; falta el número de colegiada y validar las afirmaciones normativas |
| Autoridad | 17/25 | Prensa enlazada (HOME, Cose di Casa, Homeadore, Archiboost); sin reseñas en Google ni menciones externas recientes |
| Confianza | 22/30 | Dirección, teléfono, P.IVA, privacidad, guías con fuentes y fecha, precio de ArchiAdvice; faltan precios del resto y testimonios |

**Preparación para citas en buscadores con IA: 80/100.** Las guías responden en la primera frase con la cifra, tienen tablas y fuentes; las páginas de servicio tendrán datos citables cuando estén los precios y plazos.

## Legibilidad (italiano)

| Página | Palabras | Palabras/frase | Gulpease |
|---|---|---|---|
| Reforma Bergamo | 1.198 | 15,8 | 56 |
| ArchiAdvice | 972 | 14,5 | 60 |
| Compra de vivienda | 775 | 13,8 | 59 |
| Restyling | 1.016 | 13,5 | 62 |
| Guía coste de reforma | 919 | 14,8 | 56 |
| Guía coste del arquitecto | 856 | 15,3 | 56 |

Gulpease 56–62: comprensible sin esfuerzo para un adulto con estudios secundarios. No hace falta simplificar.

## Rastros de redacción automática

| Hallazgo | Antes | Después |
|---|---|---|
| Caracteres invisibles (marcas de agua por código) | 0 | 0 |
| Frases idénticas entre páginas (≥ 8 palabras) | 5 | 2 (dos datos breves: atención con cita y colegiación) |
| Bloque "Chi sono" | La misma biografía en los 4 servicios | Una distinta por servicio, con lo que pesa en cada uno |
| "Su misura" en las 6 páginas | 19 | 15 (los que quedan son el término técnico correcto) |
| Frases hechas en inglés ("at the heart of", "transform your") | 3 | 0 |

Script de la skill (`content_humanize.py`): su tabla de frases es inglesa; en italiano y español no detecta nada, por eso la revisión se hizo a mano.

## Pendiente (no se puede sin Martina)

- Testimonios y reseñas: el mayor salto en Confianza y Experiencia.
- Precios y plazos de cada servicio: hechos citables y Confianza.
- Fotos del antes de LOVINGCOLORS y CASA PEONIA.
- Validar las afirmaciones normativas (V-1 a V-10 del cuestionario).
- Estructura: los 4 servicios siguen el mismo esqueleto (intro, por qué, proceso, caso, precio, quién soy, FAQ). Es razonable para páginas de servicio; cuando Martina aporte casos y testimonios propios de cada servicio, la diferencia entre páginas crecerá sola.
