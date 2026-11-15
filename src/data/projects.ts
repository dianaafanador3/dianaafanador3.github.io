import type { Project } from '@/types'
import project2Thumb from '@/assets/images/project-2-sketch-only.png'

export const projects: Project[] = [
  {
    id: 2,
    slug: 'project2',
    title: 'Motlle',
    description: {
      ca: 'El motlle és una empremta silenciosa, una presència que dóna forma al que encara no existeix. Com una ombra amb memòria, espera pacientment.',
      es: 'El molde es una huella silenciosa, una presencia que da forma a lo que aún no existe. Como una sombra con memoria, espera pacientemente.',
      en: 'The mould is a silent imprint, a presence that gives shape to what does not yet exist. Like a shadow with memory, it waits patiently.',
    },
    thumbnail: project2Thumb,
    href: '/project2/project2.html',
    tags: [{ en: 'Generative art', es: 'Arte generativo', ca: 'Art generatiu' }],
    number: 'P01',
    year: '2025',
  },
]
