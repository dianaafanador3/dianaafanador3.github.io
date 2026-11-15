import type { Locale } from '@/i18n'

export interface Project {
  id: number
  slug: string
  title: string
  description: Record<Locale, string>
  thumbnail: string
  href: string
  /** Optional tags shown on the card, per language */
  tags?: Record<Locale, string>[]
  number: string
  year: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export interface NavItem {
  key: 'portfolio' | 'about' | 'writing' | 'resume'
  to: string
}
