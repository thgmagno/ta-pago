'use client'

import { actions } from '@/actions'
import { useActionState } from 'react'
import { CardWithFooter } from './CardForm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorMessageForm } from './ErrorMessageForm'
import CurrencyInput from '@/components/CurrencyInput'
import { DateInput } from '@/components/DateInput'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { dict } from '@/lib/dict'
import { ReceiptFormState } from '@/lib/states/transactions'
import { ReceiptComplete } from '@/lib/types'
import { Category } from '@prisma/client'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function AddReceiptForm({ categories }: { categories: Category[] }) {
  const [formState, action, isPending] = useActionState(
    actions.transactions.receipt.create,
    { errors: {} },
  )

  return (
    <ReceiptForm
      formState={formState}
      action={action}
      isPending={isPending}
      categories={categories}
    />
  )
}

export function ReceiptForm({
  formState,
  action,
  isPending,
  receipt,
  categories,
}: {
  formState: ReceiptFormState
  action: (payload: FormData) => void
  isPending: boolean
  receipt?: ReceiptComplete
  categories: Category[]
}) {
  return (
    <form action={action}>
      <div className="grid w-full items-center gap-4">
        {/* ID */}
        <input type="hidden" name="id" value={receipt?.id} />

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Descrição</Label>
          <Input
            name="description"
            placeholder="Descrição do pagamento (opcional)"
            defaultValue={receipt?.transaction?.description ?? ''}
          />
          <ErrorMessageForm message={formState.errors.description} />
        </div>

        {/* Amount */}
        <div className="flex flex-col space-y-2">
          <Label>Valor</Label>
          <CurrencyInput name="amount" defaultValue={receipt?.amount} />
          <ErrorMessageForm message={formState.errors.amount} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* receivedAt */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do recebimento</Label>
            <DateInput name="receivedAt" defaultValue={receipt?.receivedAt} />
            <ErrorMessageForm message={formState.errors.receivedAt} />
          </div>

          {/* scheduledDate */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do vencimento</Label>
            <DateInput
              name="scheduledDate"
              defaultValue={receipt?.scheduledDate}
            />
            <ErrorMessageForm message={formState.errors.scheduledDate} />
          </div>
        </div>

        {/* categoryId */}
        <div className="flex flex-1 flex-col space-y-2">
          <Label>Categoria</Label>
          <div className="flex items-center gap-2">
            <Select
              name="categoryId"
              defaultValue={receipt?.transaction?.categoryId ?? ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>

                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Link
              href="/financas/categorias/adicionar"
              className={buttonVariants({ variant: 'outline' })}
            >
              <Plus className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline-flex">Adicionar</span>
            </Link>
          </div>
          <ErrorMessageForm message={formState.errors.categoryId} />
        </div>

        <div className="flex flex-col gap-2 lg:flex-row">
          {/* receiptMethod */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Método</Label>
            <Select
              name="receiptMethod"
              defaultValue={receipt?.receiptMethod ?? ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar método" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Métodos</SelectLabel>
                  {dict.ReceiptMethods.sort((a, b) =>
                    a.label.localeCompare(b.label),
                  ).map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorMessageForm message={formState.errors.receiptMethod} />
          </div>

          {/* status */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Status</Label>
            <Select name="status" defaultValue={receipt?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {dict.ReceiptStatus.sort((a, b) =>
                    a.label.localeCompare(b.label),
                  ).map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorMessageForm message={formState.errors.status} />
          </div>
        </div>
      </div>
      <CardWithFooter
        onCancelRedirectTo="/financas/recebimentos"
        isPending={isPending}
      />
    </form>
  )
}
