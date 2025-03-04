'use client'

import { actions } from '@/actions'
import { useActionState } from 'react'
import { PaymentForm } from './AddPaymentForm'
import { PaymentComplete } from '@/lib/types'

export function EditPaymentForm({ payment }: { payment?: PaymentComplete }) {
  const [formState, action, isPending] = useActionState(
    actions.transactions.payment.create,
    { errors: {} },
  )

  return (
    <PaymentForm
      formState={formState}
      action={action}
      isPending={isPending}
      payment={payment}
    />
  )
}
