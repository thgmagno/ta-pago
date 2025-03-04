'use client'

import { useActionState } from 'react'
import { actions } from '@/actions'
import { GroupForm } from './AddGroupForm'
import { Group } from '@prisma/client'

export function EditGroupForm({ group }: { group?: Group }) {
  const [formState, action, isPending] = useActionState(
    actions.groups.group.update,
    { errors: {} },
  )

  return (
    <GroupForm
      formState={formState}
      action={action}
      isPending={isPending}
      group={group}
    />
  )
}
