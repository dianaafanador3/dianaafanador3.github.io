import type { Locale } from '@/i18n'

/** Text in every supported language. */
export type L10n = Record<Locale, string>

/** Same text in every language (names, tech terms). */
const same = (s: string): L10n => ({ es: s, en: s, ca: s })

export interface Role {
  title: L10n
  /** 'YYYY-MM' */
  start: string
  /** 'YYYY-MM', or null for present */
  end: string | null
}

export interface Job {
  company: string
  location?: L10n
  roles: Role[]
  highlights?: L10n[]
}

export interface Study {
  school: string
  degree: L10n
  period: string
  ongoing?: boolean
}

export interface Honor {
  name: L10n
  org: string
  year: string
}

const bcn: L10n = { es: 'Barcelona', en: 'Barcelona', ca: 'Barcelona' }
const berlin: L10n = { es: 'Berlín', en: 'Berlin', ca: 'Berlín' }

export const experience: Job[] = [
  {
    company: 'Canary Technologies',
    location: bcn,
    roles: [
      { title: same('Lead Mobile Engineer'), start: '2026-10', end: null },
      { title: same('Senior Mobile Engineer'), start: '2026-01', end: '2026-10' },
    ],
  },
  {
    company: 'Bitpanda',
    location: bcn,
    roles: [{ title: same('iOS Engineer'), start: '2025-03', end: '2026-01' }],
  },
  {
    company: 'MongoDB',
    location: bcn,
    roles: [
      {
        title: same('Senior Software Engineer · Mobile · SDK · iOS'),
        start: '2021-01',
        end: '2024-10',
      },
    ],
    highlights: [
      {
        en: 'Built new features for the Realm Swift SDK, working closely with cross-platform teams on scoping, design and development.',
        es: 'Desarrollo de nuevas funcionalidades del SDK de Realm para Swift, en estrecha colaboración con los equipos multiplataforma en el alcance, el diseño y el desarrollo.',
        ca: 'Desenvolupament de noves funcionalitats de l’SDK de Realm per a Swift, en estreta col·laboració amb els equips multiplataforma en l’abast, el disseny i el desenvolupament.',
      },
      {
        en: 'Migrated CI from Jenkins to Xcode Cloud and GitHub Actions, significantly reducing infrastructure maintenance.',
        es: 'Migración de la CI de Jenkins a Xcode Cloud y GitHub Actions, reduciendo notablemente el mantenimiento de infraestructura.',
        ca: 'Migració de la CI de Jenkins a Xcode Cloud i GitHub Actions, reduint notablement el manteniment d’infraestructura.',
      },
      {
        en: 'Kept the SDK up to date with the latest Swift, Xcode and Apple frameworks, and supported SPM, CocoaPods, Carthage and XCFramework installs.',
        es: 'Mantenimiento del SDK al día con las últimas versiones de Swift, Xcode y los frameworks de Apple, con soporte para SPM, CocoaPods, Carthage y XCFramework.',
        ca: 'Manteniment de l’SDK al dia amb les últimes versions de Swift, Xcode i els frameworks d’Apple, amb suport per a SPM, CocoaPods, Carthage i XCFramework.',
      },
      {
        en: 'Resolved community issues, reduced technical debt and gave in-depth technical support to community and enterprise users.',
        es: 'Resolución de incidencias de la comunidad, reducción de deuda técnica y soporte técnico avanzado a usuarios de la comunidad y empresas.',
        ca: 'Resolució d’incidències de la comunitat, reducció de deute tècnic i suport tècnic avançat a usuaris de la comunitat i empreses.',
      },
    ],
  },
  {
    company: 'Sopra Steria',
    location: bcn,
    roles: [
      {
        title: same('iOS Tech Lead · Mobile Engineer · iOS Developer'),
        start: '2016-09',
        end: '2021-01',
      },
    ],
    highlights: [
      {
        en: 'Led cross-functional teams designing and shipping apps for major clients in finance (Caixa) and food (Nestlé).',
        es: 'Liderazgo de equipos multidisciplinares en el diseño y lanzamiento de apps para grandes clientes de banca (Caixa) y alimentación (Nestlé).',
        ca: 'Lideratge d’equips multidisciplinaris en el disseny i llançament d’apps per a grans clients de banca (Caixa) i alimentació (Nestlé).',
      },
      {
        en: 'Introduced unit testing, SOLID principles and architecture guidelines; built apps with MVC, MVVM and VIPER using SwiftUI, UIKit and Combine.',
        es: 'Implantación de tests unitarios, principios SOLID y guías de arquitectura; apps con MVC, MVVM y VIPER usando SwiftUI, UIKit y Combine.',
        ca: 'Implantació de tests unitaris, principis SOLID i guies d’arquitectura; apps amb MVC, MVVM i VIPER fent servir SwiftUI, UIKit i Combine.',
      },
      {
        en: 'Built proofs of concept with CoreBluetooth and ARKit, estimated projects and mentored team members.',
        es: 'Pruebas de concepto con CoreBluetooth y ARKit, estimación de proyectos y mentoría del equipo.',
        ca: 'Proves de concepte amb CoreBluetooth i ARKit, estimació de projectes i mentoria de l’equip.',
      },
    ],
  },
  {
    company: 'Opentrends',
    location: bcn,
    roles: [{ title: same('iOS Developer'), start: '2015-10', end: '2016-09' }],
    highlights: [
      {
        en: 'Built a CarPlay and iOS app from scratch in Swift in under a year, with MapKit and Core Location features.',
        es: 'Desarrollo desde cero de una app para iOS y CarPlay en Swift en menos de un año, con funcionalidades de MapKit y Core Location.',
        ca: 'Desenvolupament des de zero d’una app per a iOS i CarPlay en Swift en menys d’un any, amb funcionalitats de MapKit i Core Location.',
      },
      {
        en: 'Created a module to bring car sensor data to the device and tested in a real car against CarPlay and HMI automotive standards.',
        es: 'Creación de un módulo para llevar los datos de los sensores del coche al dispositivo y pruebas en un coche real según los estándares de CarPlay y HMI de automoción.',
        ca: 'Creació d’un mòdul per portar les dades dels sensors del cotxe al dispositiu i proves en un cotxe real segons els estàndards de CarPlay i HMI d’automoció.',
      },
    ],
  },
  {
    company: 'CorseGames',
    location: bcn,
    roles: [
      {
        title: {
          en: 'Co-founder & CTO · Unity Engineer',
          es: 'Cofundadora y CTO · Unity Engineer',
          ca: 'Cofundadora i CTO · Unity Engineer',
        },
        start: '2014-01',
        end: '2016-04',
      },
    ],
    highlights: [
      {
        en: 'Led product development of casual mobile games and apps across platforms, in collaboration with the Universitat Politècnica de Catalunya. Part of ChartBoost University and the GameBCN programme.',
        es: 'Liderazgo del desarrollo de producto de juegos casuales y apps móviles multiplataforma, en colaboración con la Universitat Politècnica de Catalunya. Participación en ChartBoost University y en el programa GameBCN.',
        ca: 'Lideratge del desenvolupament de producte de jocs casuals i apps mòbils multiplataforma, en col·laboració amb la Universitat Politècnica de Catalunya. Participació a ChartBoost University i al programa GameBCN.',
      },
    ],
  },
  {
    company: 'IN2 Ingeniería de la Información',
    roles: [
      {
        title: same('Junior iOS Developer · Junior Java Engineer'),
        start: '2014-10',
        end: '2015-10',
      },
    ],
    highlights: [
      {
        en: 'Supported iOS projects, including an instant messaging app built with Objective-C and UIKit.',
        es: 'Soporte en proyectos iOS, incluida una app de mensajería instantánea con Objective-C y UIKit.',
        ca: 'Suport en projectes iOS, inclosa una app de missatgeria instantània amb Objective-C i UIKit.',
      },
    ],
  },
  {
    company: 'Telefónica Digital Services',
    location: bcn,
    roles: [{ title: same('Junior Software Engineer'), start: '2013-12', end: '2014-10' }],
    highlights: [
      {
        en: 'Developed internal corporate applications and database management tools.',
        es: 'Desarrollo de aplicaciones corporativas internas y herramientas de gestión de bases de datos.',
        ca: 'Desenvolupament d’aplicacions corporatives internes i eines de gestió de bases de dades.',
      },
    ],
  },
  {
    company: 'Redbooth, Inc.',
    location: bcn,
    roles: [{ title: { en: 'Intern', es: 'Becaria', ca: 'Becària' }, start: '2013-09', end: '2013-11' }],
    highlights: [
      {
        en: 'Supported the backend, frontend and mobile teams, reducing technical debt and building small features.',
        es: 'Apoyo a los equipos de backend, frontend y móvil, reduciendo deuda técnica y desarrollando pequeñas funcionalidades.',
        ca: 'Suport als equips de backend, frontend i mòbil, reduint deute tècnic i desenvolupant petites funcionalitats.',
      },
    ],
  },
  {
    company: 'Helmholtz-Zentrum Berlin',
    location: berlin,
    roles: [
      {
        title: { en: 'Research Intern', es: 'Becaria de investigación', ca: 'Becària de recerca' },
        start: '2008-08',
        end: '2008-10',
      },
    ],
    highlights: [
      {
        en: 'Summer research scholarship with 30 students from around the world, researching nanoparticle growth for photovoltaic cells.',
        es: 'Beca de investigación de verano con 30 estudiantes de todo el mundo, investigando el crecimiento de nanopartículas para células fotovoltaicas.',
        ca: 'Beca de recerca d’estiu amb 30 estudiants de tot el món, investigant el creixement de nanopartícules per a cèl·lules fotovoltaiques.',
      },
    ],
  },
]

export const education: Study[] = [
  {
    school: 'Universidad Internacional de La Rioja (UNIR)',
    degree: {
      en: 'Master’s in Artificial Intelligence',
      es: 'Máster en Inteligencia Artificial',
      ca: 'Màster en Intel·ligència Artificial',
    },
    period: '2024',
    ongoing: true,
  },
  {
    school: 'Universitat Politècnica de Catalunya',
    degree: {
      en: 'Master’s in Software Engineering, Computer Engineering',
      es: 'Máster en Ingeniería del Software, Ingeniería Informática',
      ca: 'Màster en Enginyeria del Programari, Enginyeria Informàtica',
    },
    period: '2014 → 2017',
  },
  {
    school: 'Universitat Politècnica de Catalunya',
    degree: {
      en: 'Master’s in Mobile Business and App Design',
      es: 'Máster en Mobile Business y Diseño de Apps',
      ca: 'Màster en Mobile Business i Disseny d’Apps',
    },
    period: '2012 → 2013',
  },
  {
    school: 'Universidad del Norte',
    degree: {
      en: 'Bachelor’s in Electronic and Telecommunications Engineering',
      es: 'Grado en Ingeniería Electrónica y de Telecomunicaciones',
      ca: 'Grau en Enginyeria Electrònica i de Telecomunicacions',
    },
    period: '2003 → 2009',
  },
]

export const honors: Honor[] = [
  { name: same('GameBCN'), org: 'Barcelona Activa', year: '2014' },
  { name: same('ChartBoost University'), org: 'ChartBoost', year: '2014' },
  {
    name: {
      en: '“Emprende tus prácticas” scholarship',
      es: 'Beca «Emprende tus prácticas»',
      ca: 'Beca «Emprende tus prácticas»',
    },
    org: 'Fundación José Manuel Entrecanales',
    year: '2013',
  },
  {
    name: {
      en: 'Summer Research Program',
      es: 'Programa de investigación de verano',
      ca: 'Programa de recerca d’estiu',
    },
    org: 'Helmholtz-Zentrum Berlin',
    year: '2008',
  },
]
