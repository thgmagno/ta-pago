'use client'

import { actions } from '@/actions'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { dict } from '@/lib/dict'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MessageFeedback } from './MessageFeedback'

interface CreateTransactionProps {
  type: 'payment' | 'receipt' | 'reserve'
}

export function CreateTransaction({ type }: CreateTransactionProps) {
  if (type === 'payment') {
    return <CreatePaymentForm />
  }

  if (type === 'receipt') {
    return <CreateReceiptForm />
  }

  if (type === 'reserve') {
    return <CreateReserveForm />
  }
}

function CreatePaymentForm() {
  const [formState, action, isPending] = useActionState(
    actions.transactions.payment.create,
    { errors: {} },
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Pagamento</CardTitle>
        <CardDescription>
          Preencha as informações do pagamento para concluir a transação.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="dueDate">Data de Vencimento</Label>
            <Input type="date" id="dueDate" name="dueDate" />
            <MessageFeedback
              type="error"
              message={formState?.errors?.dueDate}
            />
          </div>
          <div>
            <Label htmlFor="amountPaid">Valor</Label>
            <Input type="tel" id="amountPaid" name="amountPaid" />
            <MessageFeedback
              type="error"
              message={formState?.errors?.amountPaid}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {dict.PaymentStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <MessageFeedback type="error" message={formState?.errors?.status} />
          </div>
          <div>
            <Label htmlFor="paymentMethod">Método</Label>
            <Select name="paymentMethod">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                {dict.PaymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <MessageFeedback
              type="error"
              message={formState?.errors?.paymentMethod}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Processando...' : 'Lançar despesa'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

function CreateReceiptForm() {
  const [formState, action, isPending] = useActionState(
    actions.transactions.receipt.create,
    undefined,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Recebimento</CardTitle>
        <CardDescription>
          Preencha as informações do recebimento para registrar a transação.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="receiptDate">Data de Recebimento</Label>
            <Input type="date" id="receiptDate" name="receiptDate" />
          </div>
          <div>
            <Label htmlFor="amountReceived">Valor Recebido</Label>
            <Input type="tel" id="amountReceived" name="amountReceived" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {dict.ReceiptStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="receiptMethod">Método</Label>
            <Select name="receiptMethod">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                {dict.ReceiptMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Processando...' : 'Lançar recebimento'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

function CreateReserveForm() {
  const [formState, action, isPending] = useActionState(
    actions.transactions.reserve.create,
    undefined,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes da Reserva</CardTitle>
        <CardDescription>
          Complete os dados da reserva para processar a transação.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="startDate">Data de Início</Label>
            <Input type="date" id="startDate" name="startDate" />
          </div>
          <div>
            <Label htmlFor="endDate">Data de Término</Label>
            <Input type="date" id="endDate" name="endDate" />
          </div>
          <div>
            <Label htmlFor="yield">Rendimento</Label>
            <Input type="tel" id="yield" name="yield" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {dict.ReserveStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Processando...' : 'Reservar dinheiro'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
