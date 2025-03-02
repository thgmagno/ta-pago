'use client'

import { Payment } from '@prisma/client'
import { CardWithFooter } from './CardForm'

export function EditPaymentForm({ payment }: { payment: Payment }) {
  const isPending = false

  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="name">EditPayment</label>
          <input id="name" placeholder={payment.status} />
        </div>
      </div>
      <CardWithFooter
        onCancelRedirectTo="/financas/pagamentos"
        isPending={isPending}
      />
    </form>
  )
}
