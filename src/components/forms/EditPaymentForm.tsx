'use client'

import { actions } from '@/actions'
import { useActionState } from 'react'
import { PaymentForm } from './AddPaymentForm'
import { PaymentComplete } from '@/lib/types'
import { Category } from '@prisma/client'

export function EditPaymentForm({
  payment,
  categories,
}: {
  payment?: PaymentComplete
  categories: Category[]
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
      payment={payment}
      categories={categories}
    />
  )
}
