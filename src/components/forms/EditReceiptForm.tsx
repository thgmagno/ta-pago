'use client'

import { actions } from '@/actions'
import { useActionState } from 'react'
import { ReceiptForm } from './AddReceiptForm'
import { ReceiptComplete } from '@/lib/types'
import { Category } from '@prisma/client'

export function EditReceiptForm({
  receipt,
  categories,
}: {
  receipt?: ReceiptComplete
  categories: Category[]
}) {
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
      categories={categories}
    />
  )
}
