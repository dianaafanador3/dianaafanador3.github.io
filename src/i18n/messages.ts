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
    menu: 'Menu',
    close: 'Close',
  },
  home: {
    label: '00 · Portfolio',
    line1: 'Mobile apps, SDKs',
    line2: 'and generative',
    accent: 'sketches',
    lead: 'Diana Afanador — Lead Mobile Engineer in Barcelona and AI tools enthusiast. Ten years building for Apple platforms, cross-platform apps and developer SDKs.',
    featuredEyebrow: 'Featured',
    featuredMeta: 'Generative sketch · p5.js',
    careerEyebrow: 'Career',
    careerTitle: 'Resume',
    careerMeta: '10 years · 10 roles',
    workLabel: 'Selected work',
    workTitle: 'Things I make for fun',
    aboutLabel: 'About',
    aboutStatement: 'A product-driven engineer crafting mobile experiences across finance, technology and gaming — and an AI tools enthusiast.',
    aboutCta: 'More about me',
  },
  about: {
    designator: '01 · About',
    title: 'About',
    bio1:
      'Diana Afanador is a Lead Mobile Engineer at Canary Technologies in Barcelona, with 10 years of experience in software engineering. She specialises in mobile and cross-platform development, with deep expertise in Apple’s platforms and SDK development, and has led and contributed to projects across the finance, technology and gaming industries.',
    bio2:
      'Before Canary she was an iOS engineer at Bitpanda, built the Realm Swift SDK at MongoDB, and led iOS teams at Sopra Steria for clients such as Caixa and Nestlé. Her path started with games: she co-founded the mobile studio CorseGames, which took part in GameBCN and ChartBoost University. An AI tools enthusiast, she is currently studying a Master’s in Artificial Intelligence at UNIR, and explores generative art with p5.js.',
    mobileLabel: 'MOBILE',
    mobile: ['Swift · SwiftUI · UIKit', 'iOS · macOS · watchOS', 'Flutter · Cross-platform', 'SDK development · Realm'],
    beyondLabel: 'BEYOND',
    beyond: ['AI tools enthusiast', 'Artificial Intelligence · MSc', 'Tech leadership · Mentoring', 'Unity3D · Games', 'p5.js · Creative coding'],
    languagesLabel: 'LANGUAGES',
    languages: ['Spanish — native', 'English — full professional', 'Catalan — elementary', 'German — elementary'],
  },
  writing: {
    designator: '02 · Writing',
    title: 'Writing',
    lead: 'Notes on mobile engineering, SDKs and creative code.',
    noSignal: 'Nothing here yet',
    soon: 'Posts coming soon.',
  },
  resume: {
    designator: '03 · Resume',
    title: 'Resume',
    lead: 'Ten years across finance, technology and gaming — from SDKs to CarPlay.',
    experience: 'EXPERIENCE',
    education: 'EDUCATION',
    honors: 'HONOURS & AWARDS',
    present: 'Present',
    fullProfile: 'Full profile on LinkedIn',
  },
  footer: {
    label: 'Contact',
    title: 'Let’s build something',
    lead: 'Open to conversations about mobile engineering, SDKs and creative code.',
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
    menu: 'Menú',
    close: 'Cerrar',
  },
  home: {
    label: '00 · Portfolio',
    line1: 'Apps móviles, SDK',
    line2: 'y bocetos',
    accent: 'generativos',
    lead: 'Diana Afanador — Lead Mobile Engineer en Barcelona y entusiasta de las herramientas de IA. Diez años desarrollando para las plataformas de Apple, apps multiplataforma y SDK para desarrolladores.',
    featuredEyebrow: 'Destacado',
    featuredMeta: 'Boceto generativo · p5.js',
    careerEyebrow: 'Trayectoria',
    careerTitle: 'Currículum',
    careerMeta: '10 años · 10 puestos',
    workLabel: 'Proyectos',
    workTitle: 'Cosas que hago por diversión',
    aboutLabel: 'Sobre mí',
    aboutStatement: 'Una ingeniera orientada a producto que crea experiencias móviles en finanzas, tecnología y videojuegos — y entusiasta de las herramientas de IA.',
    aboutCta: 'Más sobre mí',
  },
  about: {
    designator: '01 · Sobre mí',
    title: 'Sobre mí',
    bio1:
      'Diana Afanador es Lead Mobile Engineer en Canary Technologies, en Barcelona, con 10 años de experiencia en ingeniería de software. Está especializada en desarrollo móvil y multiplataforma, con un profundo conocimiento de las plataformas de Apple y del desarrollo de SDK, y ha liderado y participado en proyectos de los sectores financiero, tecnológico y de videojuegos.',
    bio2:
      'Antes de Canary fue iOS engineer en Bitpanda, desarrolló el SDK de Realm para Swift en MongoDB y lideró equipos iOS en Sopra Steria para clientes como Caixa y Nestlé. Su camino empezó con los videojuegos: cofundó el estudio móvil CorseGames, que participó en GameBCN y ChartBoost University. Entusiasta de las herramientas de IA, actualmente cursa un Máster en Inteligencia Artificial en la UNIR y explora el arte generativo con p5.js.',
    mobileLabel: 'MÓVIL',
    mobile: ['Swift · SwiftUI · UIKit', 'iOS · macOS · watchOS', 'Flutter · Multiplataforma', 'Desarrollo de SDK · Realm'],
    beyondLabel: 'MÁS ALLÁ',
    beyond: ['Entusiasta de las herramientas de IA', 'Inteligencia Artificial · Máster', 'Liderazgo técnico · Mentoría', 'Unity3D · Videojuegos', 'p5.js · Código creativo'],
    languagesLabel: 'IDIOMAS',
    languages: ['Español — nativo', 'Inglés — profesional completo', 'Catalán — elemental', 'Alemán — elemental'],
  },
  writing: {
    designator: '02 · Escritos',
    title: 'Escritos',
    lead: 'Notas sobre ingeniería móvil, SDK y código creativo.',
    noSignal: 'Aún no hay nada',
    soon: 'Próximamente.',
  },
  resume: {
    designator: '03 · Currículum',
    title: 'Currículum',
    lead: 'Diez años en finanzas, tecnología y videojuegos — de los SDK a CarPlay.',
    experience: 'EXPERIENCIA',
    education: 'FORMACIÓN',
    honors: 'PREMIOS Y RECONOCIMIENTOS',
    present: 'Actualidad',
    fullProfile: 'Perfil completo en LinkedIn',
  },
  footer: {
    label: 'Contacto',
    title: 'Construyamos algo',
    lead: 'Abierta a conversar sobre ingeniería móvil, SDK y código creativo.',
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
    menu: 'Menú',
    close: 'Tancar',
  },
  home: {
    label: '00 · Portfoli',
    line1: 'Apps mòbils, SDK',
    line2: 'i esbossos',
    accent: 'generatius',
    lead: 'Diana Afanador — Lead Mobile Engineer a Barcelona i entusiasta de les eines d’IA. Deu anys desenvolupant per a les plataformes d’Apple, apps multiplataforma i SDK per a desenvolupadors.',
    featuredEyebrow: 'Destacat',
    featuredMeta: 'Esbós generatiu · p5.js',
    careerEyebrow: 'Trajectòria',
    careerTitle: 'Currículum',
    careerMeta: '10 anys · 10 llocs',
    workLabel: 'Projectes',
    workTitle: 'Coses que faig per diversió',
    aboutLabel: 'Sobre mi',
    aboutStatement: 'Una enginyera orientada a producte que crea experiències mòbils en finances, tecnologia i videojocs — i entusiasta de les eines d’IA.',
    aboutCta: 'Més sobre mi',
  },
  about: {
    designator: '01 · Sobre mi',
    title: 'Sobre mi',
    bio1:
      'La Diana Afanador és Lead Mobile Engineer a Canary Technologies, a Barcelona, amb 10 anys d’experiència en enginyeria de programari. Està especialitzada en desenvolupament mòbil i multiplataforma, amb un coneixement profund de les plataformes d’Apple i del desenvolupament d’SDK, i ha liderat i participat en projectes dels sectors financer, tecnològic i de videojocs.',
    bio2:
      'Abans de Canary va ser iOS engineer a Bitpanda, va desenvolupar l’SDK de Realm per a Swift a MongoDB i va liderar equips iOS a Sopra Steria per a clients com Caixa i Nestlé. El seu camí va començar amb els videojocs: va cofundar l’estudi mòbil CorseGames, que va participar a GameBCN i ChartBoost University. Entusiasta de les eines d’IA, actualment cursa un Màster en Intel·ligència Artificial a la UNIR i explora l’art generatiu amb p5.js.',
    mobileLabel: 'MÒBIL',
    mobile: ['Swift · SwiftUI · UIKit', 'iOS · macOS · watchOS', 'Flutter · Multiplataforma', 'Desenvolupament d’SDK · Realm'],
    beyondLabel: 'MÉS ENLLÀ',
    beyond: ['Entusiasta de les eines d’IA', 'Intel·ligència Artificial · Màster', 'Lideratge tècnic · Mentoria', 'Unity3D · Videojocs', 'p5.js · Codi creatiu'],
    languagesLabel: 'IDIOMES',
    languages: ['Castellà — natiu', 'Anglès — professional complet', 'Català — elemental', 'Alemany — elemental'],
  },
  writing: {
    designator: '02 · Escrits',
    title: 'Escrits',
    lead: 'Notes sobre enginyeria mòbil, SDK i codi creatiu.',
    noSignal: 'Encara no hi ha res',
    soon: 'Properament.',
  },
  resume: {
    designator: '03 · Currículum',
    title: 'Currículum',
    lead: 'Deu anys en finances, tecnologia i videojocs — dels SDK a CarPlay.',
    experience: 'EXPERIÈNCIA',
    education: 'FORMACIÓ',
    honors: 'PREMIS I RECONEIXEMENTS',
    present: 'Actualitat',
    fullProfile: 'Perfil complet a LinkedIn',
  },
  footer: {
    label: 'Contacte',
    title: 'Construïm alguna cosa',
    lead: 'Oberta a parlar d’enginyeria mòbil, SDK i codi creatiu.',
  },
}

export const messages: Record<Locale, Messages> = { es, en, ca }
