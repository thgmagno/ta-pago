import { actions } from '@/actions'
import { AddPaymentForm } from '@/components/forms/AddPaymentForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddPaymentPage() {
  const { paymentCategories } = await actions.categories.category.findAll()

  return (
    <section className="page">
      <CardWithForm>
        <AddPaymentForm categories={paymentCategories?.data ?? []} />
      </CardWithForm>
    </section>
  )
}
