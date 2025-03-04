import { CardWithForm } from '@/components/forms/CardForm'
import { EditReceiptForm } from '@/components/forms/EditReceiptForm'
import { Receipt } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export default async function EditReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const receipt: Receipt = {
    id: 'abc123',
    amountReceived: new Decimal(500.0),
    receiptDate: new Date(),
    receiptMethod: 'SALARY',
    status: 'RECEIVED',
    transactionId: 'abcd1234',
  }

  return (
    <section className="page">
      <CardWithForm>
        <EditReceiptForm receipt={receipt} />
      </CardWithForm>
    </section>
  )
}
