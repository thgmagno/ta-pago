import { CardWithForm } from '@/components/forms/CardForm'
import { EditPaymentForm } from '@/components/forms/EditPaymentForm'
import { Payment } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export default async function EditPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const payment: Payment = {
    id: 'abc123',
    amountPaid: new Decimal(500.0),
    dueDate: new Date(),
    paymentMethod: 'PIX',
    status: 'PAID',
    transactionId: 'abcd1234',
  }

  return (
    <section>
      <span>Editar pagamento</span>
      <CardWithForm>
        <EditPaymentForm payment={payment} />
      </CardWithForm>
    </section>
  )
}
