import { AddCategoryForm } from '@/components/forms/AddCategoryForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddPaymentPage() {
  return (
    <section>
      <span>Adicionar pagamento</span>
      <CardWithForm>
        <AddCategoryForm />
      </CardWithForm>
    </section>
  )
}
