/**
 * data.js — Datos institucionales inmutables de la Ruta Única de Atención (HS/AS en la APE)
 * Cero rastro: sin llamadas externas, sin cookies ni almacenamiento local.
 */
(function (global) {
  "use strict";

  var RUTA_DATA = Object.freeze({
    publicUrl: "https://sivople.github.io/ruta-unica-atencion-ape/",
    qrAssets: Object.freeze({
      svg: "./assets/qr-ruta-atencion.svg",
      png: "./assets/qr-ruta-atencion.png"
    }),
    headerBanner: Object.freeze({
      src: "./assets/cinta-logos-cultura-de-paz.jpg",
      alt: "Cintillo institucional: Gobierno del Estado de Veracruz 2024-2030, Secretaría de Gobierno (SEGOB), Subsecretaría de Gobierno (SUBSEGOB) y Dirección General de Cultura de Paz y Derechos Humanos",
      fallbackText: "Gobierno del Estado de Veracruz 2024-2030 · SEGOB · SUBSEGOB · Cultura de Paz y Derechos Humanos"
    }),

    footerLogos: Object.freeze([
      Object.freeze({
        id: "veracruz",
        sigla: "Veracruz 2024–2030",
        nombre: "Gobierno del Estado de Veracruz 2024–2030",
        src: null,
        expectedPath: "assets/logos/veracruz-2024-2030.png"
      }),
      Object.freeze({
        id: "segob",
        sigla: "SEGOB",
        nombre: "Secretaría de Gobierno",
        src: null,
        expectedPath: "assets/logos/segob.png"
      }),
      Object.freeze({
        id: "cge",
        sigla: "CGE",
        nombre: "Contraloría General del Estado",
        src: null,
        expectedPath: "assets/logos/cge.png"
      }),
      Object.freeze({
        id: "ofigob",
        sigla: "OFIGOB",
        nombre: "Oficina de Programa de Gobierno",
        src: null,
        expectedPath: "assets/logos/ofigob.png"
      }),
      Object.freeze({
        id: "stpsp",
        sigla: "STPSP",
        nombre: "Secretaría de Trabajo, Previsión Social y Productividad",
        src: null,
        expectedPath: "assets/logos/stpsp.png"
      }),
      Object.freeze({
        id: "ivm",
        sigla: "IVM",
        nombre: "Instituto Veracruzano de las Mujeres",
        src: null,
        expectedPath: "assets/logos/ivm.png"
      }),
      Object.freeze({
        id: "cultura-paz",
        sigla: "Cultura de Paz",
        nombre: "Dirección General de Cultura de Paz y Derechos Humanos",
        src: null,
        expectedPath: "assets/logos/cultura-de-paz.png"
      }),
      Object.freeze({
        id: "genero",
        sigla: "Género",
        nombre: "Unidad de Género",
        src: null,
        expectedPath: "assets/logos/unidad-de-genero.png"
      }),
      Object.freeze({
        id: "por-amor",
        sigla: "Por Amor a Veracruz",
        nombre: "Por Amor a Veracruz",
        src: null,
        expectedPath: "assets/logos/por-amor-a-veracruz.png"
      })
    ]),

    actors: Object.freeze({
      ug: Object.freeze({
        key: "ug",
        sigla: "UG",
        name: "Unidad de Género (UG)"
      }),
      oic: Object.freeze({
        key: "oic",
        sigla: "OIC",
        name: "Órgano Interno de Control (OIC)"
      })
    }),

    steps: Object.freeze([
      Object.freeze({
        number: 1,
        actor: "ug",
        title: "Atención de primer contacto: orienta, canaliza y/o acompaña.",
        companion: "Es el espacio inicial de escucha y orientación respetuosa. En este momento puedes recibir información clara sobre la ruta disponible, canalización y acompañamiento sin juicios."
      }),
      Object.freeze({
        number: 2,
        actor: "ug",
        title: "Llena la cédula de atención.",
        companion: "La Unidad de Género registra de forma ordenada los datos básicos de la atención brindada para dar seguimiento institucional al caso."
      }),
      Object.freeze({
        number: 3,
        actor: "ug",
        title: "Remite la cédula de atención al OIC.",
        companion: "Una vez integrada la cédula, la Unidad de Género la envía al Órgano Interno de Control para que continúe la atención en el ámbito de su competencia."
      }),
      Object.freeze({
        number: 4,
        actor: "oic",
        title: "Recibe de la UG la cédula de atención.",
        companion: "El Órgano Interno de Control recibe formalmente la cédula remitida por la Unidad de Género y toma conocimiento del caso."
      }),
      Object.freeze({
        number: 5,
        actor: "oic",
        title: "Gestiona las medidas de protección ante la UA.",
        companion: "El Órgano Interno de Control solicita y gestiona ante la Unidad Administrativa las medidas orientadas a resguardar tu bienestar y entorno laboral."
      }),
      Object.freeze({
        number: 6,
        actor: "oic",
        title: "Cita a la persona en calidad de afectada para la presentación de la denuncia.",
        companion: "Se convoca a la persona afectada para formalizar la presentación de la denuncia ante la instancia competente, en un entorno de trato digno."
      }),
      Object.freeze({
        number: 7,
        actor: "oic",
        title: "Inicia la investigación.",
        companion: "Con la denuncia presentada, el Órgano Interno de Control da inicio formal a la etapa de investigación correspondiente."
      }),
      Object.freeze({
        number: 8,
        actor: "oic",
        title: "Realiza las diligencias para la integración del expediente.",
        companion: "El Órgano Interno de Control lleva a cabo las actuaciones necesarias para reunir los elementos que integran el expediente."
      }),
      Object.freeze({
        number: 9,
        actor: "oic",
        title: "Emite el informe de presunta responsabilidad administrativa y turna el IPRA a la autoridad substanciadora.",
        companion: "Al concluir la investigación, el Órgano Interno de Control elabora el Informe de Presunta Responsabilidad Administrativa (IPRA) y lo turna a la autoridad substanciadora."
      })
    ]),

    directory: Object.freeze([
      Object.freeze({
        id: "udg",
        actor: "ug",
        badge: "Unidad de Género",
        title: "Localiza tu UdG (Unidad de Género)",
        address: "Palacio de Gobierno S/N Enríquez esq. Leandro Valle, Zona Centro, C.P. 91000, Xalapa, Ver.",
        mapQuery: "Palacio de Gobierno, Enríquez esq. Leandro Valle, Zona Centro, 91000 Xalapa, Veracruz"
      }),
      Object.freeze({
        id: "oic",
        actor: "oic",
        badge: "Órgano Interno de Control",
        title: "OIC (Órgano Interno de Control)",
        address: "Palacio Federal, Gutiérrez Zamora 70, Zona Centro, 91000 Xalapa-Enríquez, Ver.",
        mapQuery: "Palacio Federal, Gutiérrez Zamora 70, Zona Centro, 91000 Xalapa-Enríquez, Veracruz"
      })
    ]),

    website: Object.freeze({
      label: "ivermujeres.gob.mx",
      url: "https://ivermujeres.gob.mx"
    }),

    glossary: Object.freeze([
      Object.freeze({
        term: "UG / UdG",
        meaning: "Unidad de Género.",
        keywords: "ug udg unidad de genero"
      }),
      Object.freeze({
        term: "OIC",
        meaning: "Órgano Interno de Control.",
        keywords: "oic organo interno de control"
      }),
      Object.freeze({
        term: "UA",
        meaning: "Unidad Administrativa.",
        keywords: "ua unidad administrativa"
      }),
      Object.freeze({
        term: "IPRA",
        meaning: "Informe de Presunta Responsabilidad Administrativa.",
        keywords: "ipra informe presunta responsabilidad administrativa"
      }),
      Object.freeze({
        term: "APE",
        meaning: "Administración Pública Estatal.",
        keywords: "ape administracion publica estatal"
      })
    ])
  });

  global.RUTA_DATA = RUTA_DATA;
})(window);
