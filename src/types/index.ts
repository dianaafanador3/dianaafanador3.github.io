import type { Locale } from '@/i18n'

export interface Project {
  id: number
  title: string
  description: Record<Locale, string>
  thumbnail: string
  href: string
  /** Optional tags shown on the card, per language */
  tags?: Record<Locale, string>[]
  number: string
  year: string
}

export interface NavItem {
  key: 'portfolio' | 'about' | 'writing' | 'resume'
  to: string
}
