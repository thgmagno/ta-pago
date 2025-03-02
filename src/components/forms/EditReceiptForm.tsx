'use client'

import { Receipt } from '@prisma/client'
import { CardWithFooter } from './CardForm'

export function EditReceiptForm({ receipt }: { receipt: Receipt }) {
  const isPending = false

  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="name">EditReceipt</label>
          <input id="name" placeholder={receipt.status} />
        </div>
      </div>
      <CardWithFooter
        onCancelRedirectTo="/financas/recebimentos"
        isPending={isPending}
      />
    </form>
  )
}
