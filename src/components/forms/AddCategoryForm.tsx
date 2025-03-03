'use client'

import { useActionState } from 'react'
import { actions } from '@/actions'
import { Category } from '@prisma/client'
import { CategoryFormState } from '@/lib/states/categories'
import { CardWithFooter } from './CardForm'
import { ErrorMessageForm } from './ErrorMessageForm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
  return (
    <form action={action}>
      <div className="grid w-full items-center gap-4">
        {/* Tipo */}
        <Label className="mb-3">Tipo: Pagamento</Label>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Descrição</Label>
          <Input
            id="description"
            placeholder="Descrição da categoria"
            defaultValue={category?.name ?? ''}
          />
          <ErrorMessageForm message={formState.errors.name} />
        </div>
      </div>
      <CardWithFooter
        onCancelRedirectTo="/financas/categorias"
        isPending={isPending}
      />
    </form>
  )
}
