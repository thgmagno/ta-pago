'use client'

import { actions } from '@/actions'
import { useActionState, useState } from 'react'
import { CardWithFooter } from './CardForm'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
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
import { ReserveFormState } from '@/lib/states/transactions'
import { ReservationComplete } from '@/lib/types'
import { Category } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AddReserveForm({ categories }: { categories: Category[] }) {
  const [formState, action, isPending] = useActionState(
    actions.transactions.reserve.create,
    { errors: {} },
  )

  return (
    <ReserveForm
      formState={formState}
      action={action}
      isPending={isPending}
      categories={categories}
    />
  )
}

export function ReserveForm({
  formState,
  action,
  isPending,
  reserve,
  categories,
}: {
  formState: ReserveFormState
  action: (payload: FormData) => void
  isPending: boolean
  reserve?: ReservationComplete
  categories: Category[]
}) {
  const [indeterminate, setIndeterminate] = useState(!reserve?.endDate)
  const { replace } = useRouter()
  const onClickAddCategory = () => {
    localStorage.setItem('categoryReferer', '/financas/reservas/adicionar')
    replace('/financas/categorias/adicionar')
  }

  return (
    <form action={action}>
      <div className="grid w-full items-center gap-4">
        {/* ID */}
        <input type="hidden" name="id" value={reserve?.id} />

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Descrição</Label>
          <Input
            name="description"
            placeholder="Descrição do pagamento (opcional)"
            defaultValue={reserve?.transaction?.description ?? ''}
          />
          <ErrorMessageForm message={formState.errors.description} />
        </div>

        {/* Amount */}
        <div className="flex flex-col space-y-2">
          <Label>Valor</Label>
          <CurrencyInput name="amount" defaultValue={reserve?.amount} />
          <ErrorMessageForm message={formState.errors.amount} />
        </div>

        {/* Yield */}
        <div className="flex flex-col space-y-2">
          <Label>Rendimento</Label>
          <CurrencyInput name="yield" defaultValue={reserve?.yield} />
          <ErrorMessageForm message={formState.errors.yield} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* startDate */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do início</Label>
            <DateInput name="startDate" defaultValue={reserve?.startDate} />
            <ErrorMessageForm message={formState.errors.startDate} />
          </div>

          {/* endDate */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do término:</Label>
            <div className="flex items-center gap-2">
              <DateInput
                name="endDate"
                defaultValue={reserve?.endDate}
                disabled={indeterminate}
              />
              <input
                type="hidden"
                name="indeterminate"
                value={indeterminate ? 'y' : 'n'}
              />
              <Switch
                id="endDate"
                checked={!indeterminate}
                onCheckedChange={() => setIndeterminate(!indeterminate)}
              />
            </div>
            <ErrorMessageForm message={formState.errors.endDate} />
          </div>
        </div>

        {/* categoryId */}
        <div className="flex flex-1 flex-col space-y-2">
          <Label>Categoria</Label>
          <div className="flex items-center gap-2">
            <Select
              name="categoryId"
              defaultValue={reserve?.transaction?.categoryId ?? ''}
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
            <Button
              onClick={onClickAddCategory}
              type="button"
              variant="outline"
            >
              <Plus className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline-flex">Adicionar</span>
            </Button>
          </div>
          <ErrorMessageForm message={formState.errors.categoryId} />
        </div>

        {/* status */}
        <div className="flex flex-1 flex-col space-y-2">
          <Label>Status</Label>
          <Select name="status" defaultValue={reserve?.status}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {dict.ReserveStatus.sort((a, b) =>
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
      <CardWithFooter
        onCancelRedirectTo="/financas/reservas"
        isPending={isPending}
      />
    </form>
  )
}
