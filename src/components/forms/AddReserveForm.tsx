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
import { ReserveFormState } from '@/lib/states/transactions'
import { Reserve, Transaction } from '@prisma/client'

export function AddReserveForm() {
  const [formState, action, isPending] = useActionState(
    actions.transactions.reserve.create,
    { errors: {} },
  )

  return (
    <ReserveForm formState={formState} action={action} isPending={isPending} />
  )
}

export function ReserveForm({
  formState,
  action,
  isPending,
  transaction,
}: {
  formState: ReserveFormState
  action: (payload: FormData) => void
  isPending: boolean
  transaction?: Transaction & { reserve: Reserve }
}) {
  return (
    <form action={action}>
      <div className="grid w-full items-center gap-4">
        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Descrição</Label>
          <Input
            id="description"
            placeholder="Descrição do pagamento (opcional)"
            defaultValue={transaction?.description ?? ''}
          />
          <ErrorMessageForm message={formState.errors.description} />
        </div>

        {/* Amount */}
        <div className="flex flex-col space-y-2">
          <Label>Valor</Label>
          <CurrencyInput
            name="amount"
            defaultValue={transaction?.reserve.amount}
          />
          <ErrorMessageForm message={formState.errors.amount} />
        </div>

        {/* Yield */}
        <div className="flex flex-col space-y-2">
          <Label>Rendimento</Label>
          <CurrencyInput
            name="yield"
            defaultValue={transaction?.reserve.yield}
          />
          <ErrorMessageForm message={formState.errors.yield} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* startDate */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do início</Label>
            <DateInput
              name="startDate"
              defaultValue={transaction?.reserve.startDate}
            />
            <ErrorMessageForm message={formState.errors.startDate} />
          </div>

          {/* endDate */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do término</Label>
            <DateInput
              name="endDate"
              defaultValue={transaction?.reserve.endDate}
            />
            <ErrorMessageForm message={formState.errors.endDate} />
          </div>
        </div>

        {/* status */}
        <div className="flex flex-1 flex-col space-y-2">
          <Label>Status</Label>
          <Select name="status" defaultValue={transaction?.reserve.status}>
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
