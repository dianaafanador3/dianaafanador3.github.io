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
      'Diana Afanador is a Lead Mobile Engineer at Canary Technologies in Barcelona, with 10 years of experience in software engineering. She specialises in mobile and cross-platform development, with deep expertise in Apple’s platforms and SDK development, and has led and contributed to projects across the finance, technology and gaming industries.',
    bio2:
      'Before Canary she was an iOS engineer at Bitpanda, built the Realm Swift SDK at MongoDB, and led iOS teams at Sopra Steria for clients such as Caixa and Nestlé. Her path started with games: she co-founded the mobile studio CorseGames, which took part in GameBCN and ChartBoost University. She is currently studying a Master’s in Artificial Intelligence at UNIR, and explores generative art with p5.js.',
    mobileLabel: '// MOBILE',
    mobile: ['Swift · SwiftUI · UIKit', 'iOS · macOS · watchOS', 'Flutter · Cross-platform', 'SDK development · Realm'],
    beyondLabel: '// BEYOND',
    beyond: ['Tech leadership · Mentoring', 'Artificial Intelligence', 'Unity3D · Games', 'p5.js · Creative coding'],
    languagesLabel: '// LANGUAGES',
    languages: ['Spanish — native', 'English — full professional', 'Catalan — elementary', 'German — elementary'],
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
    education: '// EDUCATION',
    honors: '// HONOURS & AWARDS',
    present: 'Present',
    fullProfile: 'Full profile on LinkedIn ↗',
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
      'Diana Afanador es Lead Mobile Engineer en Canary Technologies, en Barcelona, con 10 años de experiencia en ingeniería de software. Está especializada en desarrollo móvil y multiplataforma, con un profundo conocimiento de las plataformas de Apple y del desarrollo de SDK, y ha liderado y participado en proyectos de los sectores financiero, tecnológico y de videojuegos.',
    bio2:
      'Antes de Canary fue iOS engineer en Bitpanda, desarrolló el SDK de Realm para Swift en MongoDB y lideró equipos iOS en Sopra Steria para clientes como Caixa y Nestlé. Su camino empezó con los videojuegos: cofundó el estudio móvil CorseGames, que participó en GameBCN y ChartBoost University. Actualmente cursa un Máster en Inteligencia Artificial en la UNIR y explora el arte generativo con p5.js.',
    mobileLabel: '// MÓVIL',
    mobile: ['Swift · SwiftUI · UIKit', 'iOS · macOS · watchOS', 'Flutter · Multiplataforma', 'Desarrollo de SDK · Realm'],
    beyondLabel: '// MÁS ALLÁ',
    beyond: ['Liderazgo técnico · Mentoría', 'Inteligencia Artificial', 'Unity3D · Videojuegos', 'p5.js · Código creativo'],
    languagesLabel: '// IDIOMAS',
    languages: ['Español — nativo', 'Inglés — profesional completo', 'Catalán — elemental', 'Alemán — elemental'],
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
    education: '// FORMACIÓN',
    honors: '// PREMIOS Y RECONOCIMIENTOS',
    present: 'Actualidad',
    fullProfile: 'Perfil completo en LinkedIn ↗',
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
      'La Diana Afanador és Lead Mobile Engineer a Canary Technologies, a Barcelona, amb 10 anys d’experiència en enginyeria de programari. Està especialitzada en desenvolupament mòbil i multiplataforma, amb un coneixement profund de les plataformes d’Apple i del desenvolupament d’SDK, i ha liderat i participat en projectes dels sectors financer, tecnològic i de videojocs.',
    bio2:
      'Abans de Canary va ser iOS engineer a Bitpanda, va desenvolupar l’SDK de Realm per a Swift a MongoDB i va liderar equips iOS a Sopra Steria per a clients com Caixa i Nestlé. El seu camí va començar amb els videojocs: va cofundar l’estudi mòbil CorseGames, que va participar a GameBCN i ChartBoost University. Actualment cursa un Màster en Intel·ligència Artificial a la UNIR i explora l’art generatiu amb p5.js.',
    mobileLabel: '// MÒBIL',
    mobile: ['Swift · SwiftUI · UIKit', 'iOS · macOS · watchOS', 'Flutter · Multiplataforma', 'Desenvolupament d’SDK · Realm'],
    beyondLabel: '// MÉS ENLLÀ',
    beyond: ['Lideratge tècnic · Mentoria', 'Intel·ligència Artificial', 'Unity3D · Videojocs', 'p5.js · Codi creatiu'],
    languagesLabel: '// IDIOMES',
    languages: ['Castellà — natiu', 'Anglès — professional complet', 'Català — elemental', 'Alemany — elemental'],
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
    education: '// FORMACIÓ',
    honors: '// PREMIS I RECONEIXEMENTS',
    present: 'Actualitat',
    fullProfile: 'Perfil complet a LinkedIn ↗',
  },
}

export const messages: Record<Locale, Messages> = { es, en, ca }
