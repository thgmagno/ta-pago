import React from 'react'
import { Breadcrumb } from './Breadcrumb'

interface Props {
  children: React.ReactNode
}

export function Page({ children }: Props) {
  return (
    <main className="flex w-full flex-col space-y-6">
      <Breadcrumb />
      {children}
    </main>
  )
}
