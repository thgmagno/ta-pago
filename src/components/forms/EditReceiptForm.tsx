'use client'

import { Receipt, Transaction } from '@prisma/client'
import { actions } from '@/actions'
import { useActionState } from 'react'
import { ReceiptForm } from './AddReceiptForm'

export function EditReceiptForm({
  transaction,
}: {
  transaction?: Transaction & { receipt: Receipt }
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
      transaction={transaction}
    />
  )
}
