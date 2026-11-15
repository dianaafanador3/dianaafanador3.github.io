import type { Project } from '@/types'
import project1Thumb from '@/assets/images/project-1-sketch-only.png'
import project2Thumb from '@/assets/images/project-2-sketch-only.png'

export const projects: Project[] = [
  {
    id: 1,
    slug: 'project1',
    title: 'Calidoscopi',
    description:
      'Un calidoscopi és un petit univers en un tub: quan l\'alces davant la llum i el fas girar suaument, els seus miralls interns es converteixen en artesans de la simetria.',
    thumbnail: project1Thumb,
    href: '/project1/project1.html',
    tech: ['p5.js'],
    number: 'P01',
    color: 'var(--trace-yellow)',
  },
  {
    id: 2,
    slug: 'project2',
    title: 'Motlle',
    description:
      'El motlle és una empremta silenciosa, una presència que dóna forma al que encara no existeix. Com una ombra amb memòria, espera pacientment.',
    thumbnail: project2Thumb,
    href: '/project2/project2.html',
    tech: ['p5.js'],
    number: 'P02',
    color: 'var(--trace-orange)',
  },
  {
    id: 3,
    slug: 'project3',
    title: 'Project 3',
    description:
      'An animated screensaver showcasing a collection of images with autonomous movement, rotation, and fade effects — plus a manual Pac-Man mode.',
    thumbnail: '',
    href: '/project3/project3.html',
    tech: ['p5.js'],
    number: 'P03',
    color: 'var(--trace-cyan)',
  },
]
