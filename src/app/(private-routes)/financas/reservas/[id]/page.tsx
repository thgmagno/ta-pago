import { CardWithForm } from '@/components/forms/CardForm'
import { EditReserveForm } from '@/components/forms/EditReserveForm'
import { Reserve } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export default async function EditReservePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const reserve: Reserve = {
    id: 'abc123',
    startDate: new Date(),
    endDate: new Date(),
    yield: new Decimal(500.0),
    status: 'ACTIVE',
    transactionId: 'abcd1234',
  }

  return (
    <section>
      <span>Editar reserva</span>
      <CardWithForm>
        <EditReserveForm reserve={reserve} />
      </CardWithForm>
    </section>
  )
}
