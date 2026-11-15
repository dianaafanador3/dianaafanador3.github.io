export interface Project {
  id: number
  slug: string
  title: string
  description: string
  thumbnail: string
  href: string
  tech: string[]
  number: string
  /** Section accent color CSS variable name */
  color: string
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
  label: string
  to: string
  /** Section accent color CSS variable */
  color: string
}
