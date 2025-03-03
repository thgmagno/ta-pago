'use client'

import { Payment, Transaction } from '@prisma/client'
import { actions } from '@/actions'
import { useActionState } from 'react'
import { PaymentForm } from './AddPaymentForm'

export function EditPaymentForm({
  transaction,
}: {
  transaction?: Transaction & { payment: Payment }
}) {
  const [formState, action, isPending] = useActionState(
    actions.transactions.payment.create,
    { errors: {} },
  )

  return (
    <PaymentForm
      formState={formState}
      action={action}
      isPending={isPending}
      transaction={transaction}
    />
  )
}
