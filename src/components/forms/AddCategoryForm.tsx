'use client'

import { useActionState, useEffect, useState } from 'react'
import { actions } from '@/actions'
import { Category } from '@prisma/client'
import { CategoryFormState } from '@/lib/states/categories'
import { CardWithFooter } from './CardForm'
import { ErrorMessageForm } from './ErrorMessageForm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSession } from 'next-auth/react'

export function AddCategoryForm() {
  const [formState, action, isPending] = useActionState(
    actions.categories.category.create,
    { errors: {} },
  )

  return (
    <CategoryForm formState={formState} action={action} isPending={isPending} />
  )
}

export function CategoryForm({
  formState,
  action,
  isPending,
  category,
}: {
  formState: CategoryFormState
  action: (payload: FormData) => void
  isPending: boolean
  category?: Category
}) {
  const { data } = useSession()
  const [referer, setReferer] = useState('/financas/categorias')

  useEffect(() => {
    const storagedReferer = localStorage.getItem('categoryReferer')
    if (storagedReferer) {
      setReferer(storagedReferer)
    }
    return () => {
      localStorage.removeItem('categoryReferer')
    }
  }, [])

  return (
    <form action={action}>
      <div className="grid w-full items-center gap-4">
        <input type="hidden" name="referer" value={referer} />

        {/* ID */}
        <input type="hidden" name="id" value={category?.id} />

        {/* Tipo */}
        <div className="flex flex-col space-y-2">
          <Label>Tipo</Label>
          <Select name="type" defaultValue={category?.type ?? ''}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipos</SelectLabel>
                <SelectItem key={'PAYMENT'} value={'PAYMENT'}>
                  Pagamento
                </SelectItem>
                <SelectItem key={'RECEIPT'} value={'RECEIPT'}>
                  Recebimento
                </SelectItem>
                <SelectItem key={'RESERVATION'} value={'RESERVATION'}>
                  Reserva
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <ErrorMessageForm message={formState.errors.name} />
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Descrição</Label>
          <Input
            name="name"
            placeholder="Descrição da categoria"
            defaultValue={category?.name ?? ''}
          />
          <ErrorMessageForm message={formState.errors.name} />
        </div>
      </div>
      <CardWithFooter
        onCancelRedirectTo={referer}
        isPending={isPending}
        transactionGroupIp={category?.groupId}
        isEdition={!!category?.id}
        isOwner={category?.userId === data?.user.id}
      />
    </form>
  )
}
