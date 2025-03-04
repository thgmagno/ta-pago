'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <section className="page">
      <p>SettingsPage</p>
      <div>
        <Button onClick={actions.session.signOutAndRedirect}>
          Encerrar sessão
        </Button>
      </div>
    </section>
  )
}
