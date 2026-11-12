# CONSTRAINTS.md — Reglas de Calidad, Privacidad, Fidelidad Normativa y Accesibilidad

Este documento establece las restricciones técnicas, éticas y normativas de cumplimiento obligatorio para la guía interactiva **Ruta Única de Atención de casos de hostigamiento sexual y/o acoso sexual en la Administración Pública Estatal (APE)**.

---

## 1. Privacidad, Seguridad y Cero Rastro

| Dimensión | Regla estricta | Verificación |
|---|---|---|
| **Cookies** | Cero cookies (`document.cookie` vacío). | Inspección en DevTools (`Application > Cookies`) y auditoría de código. |
| **Almacenamiento local** | Prohibido el uso de `localStorage`, `sessionStorage` e `IndexedDB`. Todo el estado de lectura, filtros y accesibilidad vive únicamente en memoria durante la sesión activa. | Búsqueda estática en `/js/*.js` sin referencias a `localStorage`, `sessionStorage` o `indexedDB`. |
| **Analítica y rastreadores** | Prohibido incluir scripts de analítica, píxeles de seguimiento, fuentes remotas obligatorias o llamadas `fetch`/`XMLHttpRequest` hacia servidores externos. | Inspección de red en DevTools (`Network`): 0 peticiones externas al cargar la página. |
| **Formularios de denuncia** | Prohibido incluir formularios que capturen datos personales, relatos de hechos o denuncias en línea. | Auditoría de DOM: ausencia de etiquetas `<form>` de captura de datos personales. |
| **Salida rápida (Emergencia)** | Botón fijo siempre visible en pantalla y atajo global con la tecla `Escape` que ejecutan `window.location.replace("https://www.google.com")` para reemplazar la entrada actual del historial. | Prueba funcional con clic y tecla `Escape`. |

---

## 2. Fidelidad Normativa y Enfoque No Revictimizante

1. **Fidelidad literal al cartel institucional:**
   - Los títulos y enunciados principales de los **9 pasos** deben coincidir exactamente con el cartel oficial:
     - **Unidad de Género (UG):** Pasos 1 a 3.
     - **Órgano Interno de Control (OIC):** Pasos 4 a 9.
   - Los domicilios oficiales de **UdG**, **OIC** y el sitio **`ivermujeres.gob.mx`** deben reproducirse sin alteraciones.
   - El glosario debe incluir exactamente las siglas oficiales: **UG / UdG**, **OIC**, **UA**, **IPRA** y **APE**.
2. **Prohibición de inventar información jurídica:**
   - Prohibido añadir plazos legales (días hábiles o naturales), artículos de leyes, requisitos documentales externos, teléfonos no incluidos en el cartel o promesas procesales.
3. **Lenguaje claro, empático y centrado en la persona:**
   - Las notas breves de acompañamiento en cada paso explican el propósito práctico de la etapa en lenguaje accesible, respetuoso y libre de juicios o carga revictimizante.

---

## 3. Arquitectura Offline-First y Resiliencia de Activos

1. **Compatibilidad `file://`:** La aplicación debe funcionar íntegramente abriendo `index.html` directamente desde el explorador de archivos (sin servidor web, sin módulos ES que fallen por CORS en `file://`, sin dependencias CDN obligatorias).
2. **Cero imágenes rotas (`404`):**
   - Toda etiqueta `<img>` debe apuntar a un recurso local verificado o contar con un manejador `onerror` que oculte la imagen fallida y muestre un distintivo tipográfico institucional.
   - En la configuración base, solo se referencian en `<img>` los archivos existentes en `/assets`; las siglas institucionales adicionales se renderizan como insignias vectoriales/tipográficas limpias hasta que el usuario agregue sus archivos en `/assets/logos/`.

---

## 4. Accesibilidad (WCAG 2.1 AA / AAA)

1. **Navegación completa por teclado:** `Tab`, `Shift+Tab`, `Enter`, `Espacio` para tarjetas desplegables, filtros, buscador y controles de accesibilidad; `Escape` reservado para la Salida Rápida.
2. **Enlace de salto (`Skip link`):** Primer elemento enfocable para ir directo al contenido principal (`#contenido-principal`).
3. **Estados de foco visibles:** Indicadores `:focus-visible` de alto contraste en todos los controles interactivos.
4. **Controles integrados en sesión:**
   - Ajuste de tamaño tipográfico (`A-`, `Restablecer`, `A+`).
   - Modo **Alto Contraste** conmutado mediante `aria-pressed` y clases CSS dedicadas.
5. **Respeto a preferencias del sistema:** Soporte para `@media (prefers-reduced-motion: reduce)` y `@media (prefers-contrast: more)`.
