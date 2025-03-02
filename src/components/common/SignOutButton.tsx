'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'
import { useActionState } from 'react'

export function SignOutButton() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, action, isPending] = useActionState(
    actions.users.user.signOut,
    undefined,
  )

  return (
    <form action={action} className="flex flex-1">
      <Button
        type="submit"
        className="flex-1"
        variant="destructive"
        disabled={isPending}
      >
        {isPending ? 'Encerrando...' : 'Encerrar sessão'}
      </Button>
    </form>
  )
}
