'use client'

import { actions } from '@/actions'
import { useActionState } from 'react'
import { ReserveForm } from './AddReserveForm'
import { ReservationComplete } from '@/lib/types'

export function EditReserveForm({
  reserve,
}: {
  reserve?: ReservationComplete
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
    />
  )
}
