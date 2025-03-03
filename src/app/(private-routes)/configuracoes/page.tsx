'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'

export default async function SettingsPage() {
  return (
    <section>
      <p>SettingsPage</p>
      <Button onClick={actions.session.signOutAndRedirect}>
        Encerrar sessão
      </Button>
    </section>
  )
}
