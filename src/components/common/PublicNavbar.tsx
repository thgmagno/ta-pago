'use client'

import Link from 'next/link'

export function PublicNavbar() {
  return (
    <nav>
      <Link href="/entrar">Fazer login</Link>
      <Link href="/sobre">Conhecer o projeto</Link>
      <Link href="/apoiar">Apoiar o projeto</Link>
    </nav>
  )
}
