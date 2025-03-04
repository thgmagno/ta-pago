import { AddCategoryForm } from '@/components/forms/AddCategoryForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddPaymentPage() {
  return (
    <section className="page">
      <CardWithForm>
        <AddCategoryForm />
      </CardWithForm>
    </section>
  )
}
