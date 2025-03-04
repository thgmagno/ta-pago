import { AddReserveForm } from '@/components/forms/AddReserveForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddReservePage() {
  return (
    <section className="page">
      <CardWithForm>
        <AddReserveForm />
      </CardWithForm>
    </section>
  )
}
