'use client'

import { Reserve, Transaction } from '@prisma/client'
import { actions } from '@/actions'
import { useActionState } from 'react'
import { ReserveForm } from './AddReserveForm'

export function EditReserveForm({
  transaction,
}: {
  transaction?: Transaction & { reserve: Reserve }
}) {
  const [formState, action, isPending] = useActionState(
    actions.transactions.reserve.create,
    { errors: {} },
  )

  return (
    <ReserveForm
      formState={formState}
      action={action}
      isPending={isPending}
      transaction={transaction}
    />
  )
}
