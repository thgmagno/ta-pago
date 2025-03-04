'use client'

import { actions } from '@/actions'
import { useActionState } from 'react'
import { ReceiptForm } from './AddReceiptForm'
import { ReceiptComplete } from '@/lib/types'

export function EditReceiptForm({ receipt }: { receipt?: ReceiptComplete }) {
  const [formState, action, isPending] = useActionState(
    actions.transactions.receipt.create,
    { errors: {} },
  )

  return (
    <ReceiptForm
      formState={formState}
      action={action}
      isPending={isPending}
      receipt={receipt}
    />
  )
}
