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
import { Receipt, Transaction } from '@prisma/client'

export function AddReceiptForm() {
  const [formState, action, isPending] = useActionState(
    actions.transactions.receipt.create,
    { errors: {} },
  )

  return (
    <ReceiptForm formState={formState} action={action} isPending={isPending} />
  )
}

export function ReceiptForm({
  formState,
  action,
  isPending,
  transaction,
}: {
  formState: ReceiptFormState
  action: (payload: FormData) => void
  isPending: boolean
  transaction?: Transaction & { receipt: Receipt }
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
            defaultValue={transaction?.receipt.amount}
          />
          <ErrorMessageForm message={formState.errors.amount} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* receivedAt */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do recebimento</Label>
            <DateInput
              name="receivedAt"
              defaultValue={transaction?.receipt.receivedAt}
            />
            <ErrorMessageForm message={formState.errors.receivedAt} />
          </div>

          {/* scheduledDate */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do vencimento</Label>
            <DateInput
              name="scheduledDate"
              defaultValue={transaction?.receipt.scheduledDate}
            />
            <ErrorMessageForm message={formState.errors.scheduledDate} />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* receiptMethod */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Categoria</Label>
            <Select
              name="receiptMethod"
              defaultValue={transaction?.receipt.receiptMethod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
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
            <Select name="status" defaultValue={transaction?.receipt.status}>
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
            <ErrorMessageForm message={formState.errors.scheduledDate} />
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
