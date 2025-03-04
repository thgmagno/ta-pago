'use client'

import { actions } from '@/actions'
import { useActionState } from 'react'
import { ReserveForm } from './AddReserveForm'
import { ReservationComplete } from '@/lib/types'
import { Category } from '@prisma/client'

export function EditReserveForm({
  reserve,
  categories,
}: {
  reserve?: ReservationComplete
  categories: Category[]
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
      reserve={reserve}
      categories={categories}
    />
  )
}
