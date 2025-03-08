'use client'

import { Input } from '@/components/ui/input'
import { ErrorMessageForm } from './ErrorMessageForm'
import { Button } from '../ui/button'
import { useActionState } from 'react'
import { actions } from '@/actions'

interface Group {
  id: string
  name: string
  tag: string
}

interface SearchFormProps {
  action: (formData: FormData) => void
  isPending: boolean
  error?: string | string[]
}

interface GroupListProps {
  groupList: Group[]
}

export function FindGroupForm() {
  const [formState, action, isPending] = useActionState(
    actions.groups.group.findBySearchTerm,
    { errors: {} },
  )

  const groupList = formState.data?.groups || []

  return (
    <div>
      <SearchForm
        action={action}
        isPending={isPending}
        error={formState.errors?.searchTerm}
      />
      {formState?.formSended && <GroupList groupList={groupList} />}
    </div>
  )
}

function SearchForm({ action, isPending, error }: SearchFormProps) {
  return (
    <form action={action} className="mt-5">
      <div className="flex flex-col space-y-2">
        <div className="flex gap-2.5">
          <Input name="searchTerm" placeholder="Nome ou Tag do grupo" />
          <Button disabled={isPending}>
            {isPending ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
        <ErrorMessageForm message={error} />
      </div>
    </form>
  )
}

function GroupList({ groupList }: GroupListProps) {
  if (!groupList.length)
    return (
      <p className="text-muted-foreground mt-4 border-t-2 p-2.5 text-center">
        Nenhum grupo encontrado
      </p>
    )

  return (
    <div className="mt-4 border-t-2">
      {groupList.map((group) => (
        <div
          key={group.id}
          className="mt-2 flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <p>
              <b>Nome</b>: {group.name}
            </p>
            <p>
              <b>Tag</b>: {group.tag}
            </p>
          </div>
          <Button>Mandar Convite</Button>
        </div>
      ))}
    </div>
  )
}
