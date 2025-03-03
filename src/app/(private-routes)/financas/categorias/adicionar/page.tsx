import { AddCategoryForm } from '@/components/forms/AddCategoryForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddPaymentPage() {
  return (
    <section>
      <span>Categoria categoria</span>
      <CardWithForm>
        <AddCategoryForm />
      </CardWithForm>
    </section>
  )
}
