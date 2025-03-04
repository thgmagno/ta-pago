import { actions } from '@/actions'
import { AddReserveForm } from '@/components/forms/AddReserveForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddReservePage() {
  const { reservationCategories } = await actions.categories.category.findAll()

  return (
    <section className="page">
      <CardWithForm>
        <AddReserveForm categories={reservationCategories?.data ?? []} />
      </CardWithForm>
    </section>
  )
}
