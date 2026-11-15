export const locales = ['es', 'en', 'ca'] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  ca: 'Català',
}

const en = {
  meta: {
    description: 'DiAfanador — Developer portfolio',
  },
  nav: {
    main: 'Main navigation',
    home: 'DiAfanador — Home',
    portfolio: 'Portfolio',
    about: 'About',
    writing: 'Writing',
    resume: 'Resume',
    language: 'Language',
  },
  home: {
    designator: '// U01 — PORTFOLIO',
    subtitle: 'Developer',
  },
  carousel: {
    prev: 'Previous project',
    next: 'Next project',
    projects: 'Projects',
    view: 'View {title}',
  },
  about: {
    designator: '// U02 — ABOUT',
    title: 'About',
    bio1:
      'Diana Afanador is a Senior Software Engineer based in Barcelona, specialising in mobile and cross-platform development. She currently works at Canary Technologies, and previously spent several years at MongoDB building the Realm SDKs, with a focus on Swift and iOS.',
    bio2:
      'Her path into software started with games: she launched CorseGames, an indie mobile games venture, and was selected for Barcelona Activa’s GameBCN programme and for ChartBoost University, which took her studio to GDC. She is currently studying a Master’s in Artificial Intelligence at UNIR, and explores generative art with p5.js.',
    mobileLabel: '// MOBILE',
    mobile: ['Swift · iOS', 'Cross-platform', 'Realm · MongoDB', 'SDK development'],
    beyondLabel: '// BEYOND',
    beyond: ['Artificial Intelligence', 'Unity3D · Games', 'p5.js · Creative coding', 'TypeScript · Vue'],
    languagesLabel: '// LANGUAGES',
    languages: ['Spanish — native', 'English — professional', 'Catalan — basic', 'German — basic'],
  },
  writing: {
    designator: '// U03 — WRITING',
    title: 'Writing',
    noSignal: '// NO SIGNAL',
    soon: 'Posts coming soon.',
  },
  resume: {
    designator: '// U04 — RESUME',
    title: 'Resume',
    experience: '// EXPERIENCE',
    period: '2022 — Present',
    role: 'Developer',
    education: '// EDUCATION',
    eduPeriod: 'Add your education',
    eduDegree: 'Your Degree',
    eduSchool: 'Your Institution',
    download: '↓ Download PDF',
  },
}

export type Messages = typeof en

const es: Messages = {
  meta: {
    description: 'DiAfanador — Portfolio de desarrollo',
  },
  nav: {
    main: 'Navegación principal',
    home: 'DiAfanador — Inicio',
    portfolio: 'Portfolio',
    about: 'Sobre mí',
    writing: 'Escritos',
    resume: 'Currículum',
    language: 'Idioma',
  },
  home: {
    designator: '// U01 — PORTFOLIO',
    subtitle: 'Desarrolladora',
  },
  carousel: {
    prev: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    projects: 'Proyectos',
    view: 'Ver {title}',
  },
  about: {
    designator: '// U02 — SOBRE MÍ',
    title: 'Sobre mí',
    bio1:
      'Diana Afanador es Senior Software Engineer en Barcelona, especializada en desarrollo móvil y multiplataforma. Actualmente trabaja en Canary Technologies y antes pasó varios años en MongoDB desarrollando los SDK de Realm, centrada en Swift e iOS.',
    bio2:
      'Su camino en el software empezó con los videojuegos: lanzó CorseGames, un proyecto independiente de juegos para móvil, y fue seleccionada para el programa GameBCN de Barcelona Activa y para ChartBoost University, que llevó a su estudio a la GDC. Actualmente cursa un Máster en Inteligencia Artificial en la UNIR y explora el arte generativo con p5.js.',
    mobileLabel: '// MÓVIL',
    mobile: ['Swift · iOS', 'Multiplataforma', 'Realm · MongoDB', 'Desarrollo de SDK'],
    beyondLabel: '// MÁS ALLÁ',
    beyond: ['Inteligencia Artificial', 'Unity3D · Videojuegos', 'p5.js · Código creativo', 'TypeScript · Vue'],
    languagesLabel: '// IDIOMAS',
    languages: ['Español — nativo', 'Inglés — profesional', 'Catalán — básico', 'Alemán — básico'],
  },
  writing: {
    designator: '// U03 — ESCRITOS',
    title: 'Escritos',
    noSignal: '// SIN SEÑAL',
    soon: 'Próximamente.',
  },
  resume: {
    designator: '// U04 — CURRÍCULUM',
    title: 'Currículum',
    experience: '// EXPERIENCIA',
    period: '2022 — Actualidad',
    role: 'Desarrolladora',
    education: '// FORMACIÓN',
    eduPeriod: 'Añade tu formación',
    eduDegree: 'Tu titulación',
    eduSchool: 'Tu institución',
    download: '↓ Descargar PDF',
  },
}

const ca: Messages = {
  meta: {
    description: 'DiAfanador — Portfoli de desenvolupament',
  },
  nav: {
    main: 'Navegació principal',
    home: 'DiAfanador — Inici',
    portfolio: 'Portfoli',
    about: 'Sobre mi',
    writing: 'Escrits',
    resume: 'Currículum',
    language: 'Idioma',
  },
  home: {
    designator: '// U01 — PORTFOLI',
    subtitle: 'Desenvolupadora',
  },
  carousel: {
    prev: 'Projecte anterior',
    next: 'Projecte següent',
    projects: 'Projectes',
    view: 'Veure {title}',
  },
  about: {
    designator: '// U02 — SOBRE MI',
    title: 'Sobre mi',
    bio1:
      'La Diana Afanador és Senior Software Engineer a Barcelona, especialitzada en desenvolupament mòbil i multiplataforma. Actualment treballa a Canary Technologies i abans va passar diversos anys a MongoDB desenvolupant els SDK de Realm, centrada en Swift i iOS.',
    bio2:
      'El seu camí en el programari va començar amb els videojocs: va llançar CorseGames, un projecte independent de jocs per a mòbil, i va ser seleccionada per al programa GameBCN de Barcelona Activa i per a ChartBoost University, que va portar el seu estudi a la GDC. Actualment cursa un Màster en Intel·ligència Artificial a la UNIR i explora l’art generatiu amb p5.js.',
    mobileLabel: '// MÒBIL',
    mobile: ['Swift · iOS', 'Multiplataforma', 'Realm · MongoDB', 'Desenvolupament de SDK'],
    beyondLabel: '// MÉS ENLLÀ',
    beyond: ['Intel·ligència Artificial', 'Unity3D · Videojocs', 'p5.js · Codi creatiu', 'TypeScript · Vue'],
    languagesLabel: '// IDIOMES',
    languages: ['Castellà — natiu', 'Anglès — professional', 'Català — bàsic', 'Alemany — bàsic'],
  },
  writing: {
    designator: '// U03 — ESCRITS',
    title: 'Escrits',
    noSignal: '// SENSE SENYAL',
    soon: 'Properament.',
  },
  resume: {
    designator: '// U04 — CURRÍCULUM',
    title: 'Currículum',
    experience: '// EXPERIÈNCIA',
    period: '2022 — Actualitat',
    role: 'Desenvolupadora',
    education: '// FORMACIÓ',
    eduPeriod: 'Afegeix la teva formació',
    eduDegree: 'La teva titulació',
    eduSchool: 'La teva institució',
    download: '↓ Descarregar PDF',
  },
}

export const messages: Record<Locale, Messages> = { es, en, ca }
