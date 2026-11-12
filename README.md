# Guía Interactiva: Ruta Única de Atención (HS/AS en la APE)

Aplicación web estática, **100% offline-first** y de **cero rastro**, diseñada para convertir el cartel institucional **"Ruta Única de Atención de casos de hostigamiento sexual y/o acoso sexual en la Administración Pública Estatal (APE)"** en una guía interactiva accesible para servidoras y servidores públicos del Estado de Veracruz.

---

## Características Principales

- **Línea de tiempo interactiva (9 pasos):** Diferenciación visual clara entre la **Unidad de Género (UG, Pasos 1–3)** y el **Órgano Interno de Control (OIC, Pasos 4–9)**, con filtro rápido por institución (`Todos`, `UG`, `OIC`), tarjetas desplegables accesibles por teclado y barra de progreso de lectura.
- **Directorio "¿Dónde acudo?":** Domicilios oficiales de la **UdG** y el **OIC** con enlaces directos a Google Maps (`target="_blank" rel="noopener noreferrer"`) y acceso al portal oficial [`ivermujeres.gob.mx`](https://ivermujeres.gob.mx).
- **Glosario de siglas:** Buscador instantáneo y tarjetas para consultar **UG / UdG**, **OIC**, **UA**, **IPRA** y **APE**.
- **Botón de Salida Rápida (Emergencia):** Botón fijo siempre visible + atajo con la tecla `Escape` que ejecuta `window.location.replace("https://www.google.com")`.
- **Accesibilidad integrada:** Controles de tamaño de texto (`A-` / `A+`), modo de **Alto Contraste**, soporte completo de teclado y cumplimiento WCAG AA/AAA.
- **Cero rastro y cero datos:** Sin cookies, sin `localStorage`/`sessionStorage`, sin analítica externa y sin formularios de denuncia.

---

## Estructura del Proyecto

```text
/
├── index.html          # Estructura semántica, cintillo de logos, línea de tiempo, directorio y glosario
├── CONSTRAINTS.md      # Reglas de privacidad, fidelidad normativa y accesibilidad
├── README.md           # Documentación del proyecto y guía de nombres de logos en /assets
├── /css
│   ├── variables.css   # Paleta de colores del cartel, tipografías y espaciados
│   ├── styles.css      # Diseño mobile-first, cintillo de logos, línea de tiempo y tarjetas
│   └── a11y.css        # Alto contraste, estados focus-visible y media queries de accesibilidad
├── /js
│   ├── data.js         # Datos inmutables (9 pasos, domicilios, glosario y rutas de logos)
│   ├── app.js          # Lógica de UI, filtros, acordeones, carga resiliente de logos y A11y
│   └── quick-exit.js   # Lógica del botón de salida rápida y atajo con tecla Escape
└── /assets             # Carpeta donde residen los logos institucionales e íconos SVG locales
```

---

## Gestión de Logotipos Locales (`/assets`)

El proyecto detecta e integra el cintillo institucional oficial disponible en el directorio de trabajo:

- `assets/cinta-logos-cultura-de-paz.jpg` — Cintillo oficial: *Gobierno del Estado de Veracruz 2024–2030, SEGOB, SUBSEGOB y Dirección General de Cultura de Paz y Derechos Humanos*.

### Cómo agregar o reemplazar logos institucionales individuales

Si deseas mostrar escudos o logotipos individuales adicionales en el pie de página (por ejemplo: **CGE**, **OFIGOB**, **STPSP**, **IVM**, **Género**, **Por Amor a Veracruz**), coloca los archivos en `/assets/logos/` con los siguientes nombres recomendados (`.png`, `.svg`, `.jpg` o `.webp`) y actualiza la propiedad `src` correspondiente en `js/data.js`:

| Institución | Ruta sugerida en `js/data.js` |
|---|---|
| Gobierno del Estado de Veracruz 2024–2030 | `assets/logos/veracruz-2024-2030.png` |
| Secretaría de Gobierno (SEGOB) | `assets/logos/segob.png` |
| Contraloría General del Estado (CGE) | `assets/logos/cge.png` |
| Oficina de Programa de Gobierno (OFIGOB) | `assets/logos/ofigob.png` |
| Secretaría de Trabajo, Previsión Social y Productividad (STPSP) | `assets/logos/stpsp.png` |
| Instituto Veracruzano de las Mujeres (IVM) | `assets/logos/ivm.png` |
| Dirección General de Cultura de Paz y Derechos Humanos | `assets/logos/cultura-de-paz.png` |
| Unidad de Género | `assets/logos/unidad-de-genero.png` |
| Por Amor a Veracruz | `assets/logos/por-amor-a-veracruz.png` |

> **Resiliencia visual:** Mientras un logotipo individual no tenga archivo asignado (o si un archivo es movido o renombrado), la interfaz renderiza una insignia tipográfica institucional estilizada (y captura cualquier error de carga mediante `onerror`) para garantizar que nunca aparezca el ícono de imagen rota del navegador.

---

## Uso Local (Offline-First)

1. Descarga o abre la carpeta del proyecto.
2. Haz doble clic en `index.html` para abrirlo directamente en tu navegador (`file://`), o sírvelo desde cualquier servidor estático.
3. No requiere instalación de dependencias, compilación ni conexión a internet (salvo al hacer clic voluntariamente en **Abrir en Mapas**, **ivermujeres.gob.mx** o **Salida Rápida**).
