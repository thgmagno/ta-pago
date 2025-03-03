'use client'

import { useActionState } from 'react'
import { CardWithFooter } from './CardForm'
import { actions } from '@/actions'
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
import { Payment, Transaction } from '@prisma/client'
import { PaymentFormState } from '@/lib/states/transactions'

export function AddPaymentForm() {
  const [formState, action, isPending] = useActionState(
    actions.transactions.payment.create,
    { errors: {} },
  )

  // [X] - description: text
  // [X] - amount: number
  // [ ] - categoryId: select
  // [X] - paidAt: Date
  // [X] - scheduledDate: Date
  // [X] - paymentMethod: select
  // [X] - status: select

  return (
    <PaymentForm formState={formState} action={action} isPending={isPending} />
  )
}

export function PaymentForm({
  formState,
  action,
  isPending,
  transaction,
}: {
  formState: PaymentFormState
  action: (payload: FormData) => void
  isPending: boolean
  transaction?: Transaction & { payment: Payment }
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
            defaultValue={transaction?.payment.amount}
          />
          <ErrorMessageForm message={formState.errors.amount} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* paidAt */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do pagamento</Label>
            <DateInput
              name="paidAt"
              defaultValue={transaction?.payment.paidAt}
            />
            <ErrorMessageForm message={formState.errors.paidAt} />
          </div>

          {/* scheduledDate */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do vencimento</Label>
            <DateInput
              name="scheduledDate"
              defaultValue={transaction?.payment.scheduledDate}
            />
            <ErrorMessageForm message={formState.errors.scheduledDate} />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* paymentMethod */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Método</Label>
            <Select
              name="paymentMethod"
              defaultValue={transaction?.payment.paymentMethod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar método" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Métodos</SelectLabel>
                  {dict.PaymentMethods.sort((a, b) =>
                    a.label.localeCompare(b.label),
                  ).map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorMessageForm message={formState.errors.paymentMethod} />
          </div>

          {/* status */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Status</Label>
            <Select name="status" defaultValue={transaction?.payment.status}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {dict.PaymentStatus.sort((a, b) =>
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
        onCancelRedirectTo="/financas/pagamentos"
        isPending={isPending}
      />
    </form>
  )
}
