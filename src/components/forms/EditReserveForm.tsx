'use client'

import { Reserve } from '@prisma/client'
import { CardWithFooter } from './CardForm'

export function EditReserveForm({ reserve }: { reserve: Reserve }) {
  const isPending = false

  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="name">EditReserve</label>
          <input id="name" placeholder={reserve.status} />
        </div>
      </div>
      <CardWithFooter
        onCancelRedirectTo="/financas/reservas"
        isPending={isPending}
      />
    </form>
  )
}
