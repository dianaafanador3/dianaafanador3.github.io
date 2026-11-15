import type { Project } from '@/types'
import project2Thumb from '@/assets/images/project-2-sketch-only.png'

export const projects: Project[] = [
  {
    id: 2,
    slug: 'project2',
    title: 'Motlle',
    description:
      'El motlle és una empremta silenciosa, una presència que dóna forma al que encara no existeix. Com una ombra amb memòria, espera pacientment.',
    thumbnail: project2Thumb,
    href: '/project2/project2.html',
    tech: ['p5.js'],
    number: 'P01',
    color: 'var(--trace-orange)',
  },
]
