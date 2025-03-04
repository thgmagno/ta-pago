'use client'

import { useActionState } from 'react'
import { actions } from '@/actions'
import { CategoryForm } from './AddCategoryForm'
import { Category } from '@prisma/client'

export function EditCategoryForm({ category }: { category?: Category }) {
  const [formState, action, isPending] = useActionState(
    actions.categories.category.update,
    { errors: {} },
  )

  return (
    <CategoryForm
      formState={formState}
      action={action}
      isPending={isPending}
      category={category}
    />
  )
}
