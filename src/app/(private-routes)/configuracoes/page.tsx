'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <section className="page">
      <p>SettingsPage</p>
      <form action={actions.session.signOutAndRedirect}>
        <Button type="submit">Encerrar sessão</Button>
      </form>
    </section>
  )
}
