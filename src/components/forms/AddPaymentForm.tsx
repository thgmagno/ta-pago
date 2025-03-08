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
import { PaymentFormState } from '@/lib/states/transactions'
import { PaymentComplete } from '@/lib/types'
import { Category } from '@prisma/client'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export function AddPaymentForm({ categories }: { categories: Category[] }) {
  const [formState, action, isPending] = useActionState(
    actions.transactions.payment.create,
    { errors: {} },
  )

  return (
    <PaymentForm
      formState={formState}
      action={action}
      isPending={isPending}
      categories={categories}
    />
  )
}

export function PaymentForm({
  formState,
  action,
  isPending,
  payment,
  categories,
}: {
  formState: PaymentFormState
  action: (payload: FormData) => void
  isPending: boolean
  payment?: PaymentComplete
  categories: Category[]
}) {
  const { data } = useSession()
  const { replace } = useRouter()
  const onClickAddCategory = () => {
    localStorage.setItem('categoryReferer', '/financas/pagamentos/adicionar')
    replace('/financas/categorias/adicionar')
  }

  return (
    <form action={action}>
      <div className="grid w-full items-center gap-4">
        {/* ID */}
        <input type="hidden" name="id" value={payment?.id} />

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Descrição</Label>
          <Input
            name="description"
            placeholder="Descrição do pagamento (opcional)"
            defaultValue={payment?.transaction?.description ?? ''}
          />
          <ErrorMessageForm message={formState.errors.description} />
        </div>

        {/* Amount */}
        <div className="flex flex-col space-y-2">
          <Label>Valor</Label>
          <CurrencyInput name="amount" defaultValue={payment?.amount} />
          <ErrorMessageForm message={formState.errors.amount} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* paidAt */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do pagamento</Label>
            <DateInput name="paidAt" defaultValue={payment?.paidAt} />
            <ErrorMessageForm message={formState.errors.paidAt} />
          </div>

          {/* scheduledDate */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Data do vencimento</Label>
            <DateInput
              name="scheduledDate"
              defaultValue={payment?.scheduledDate}
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
              defaultValue={payment?.transaction?.categoryId ?? ''}
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

        <div className="flex flex-col gap-2 lg:flex-row">
          {/* paymentMethod */}
          <div className="flex flex-1 flex-col space-y-2">
            <Label>Método</Label>
            <Select
              name="paymentMethod"
              defaultValue={payment?.paymentMethod ?? ''}
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
            <Select name="status" defaultValue={payment?.status}>
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
        transactionGroupIp={payment?.transaction?.groupId}
        isEdition={!!payment?.id}
        isOwner={payment?.transaction?.userId === data?.user.id}
      />
    </form>
  )
}
