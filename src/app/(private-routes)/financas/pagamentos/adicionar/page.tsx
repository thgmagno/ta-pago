import { AddPaymentForm } from '@/components/forms/AddPaymentForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddPaymentPage() {
  return (
    <section>
      <span>Adicionar pagamento</span>
      <CardWithForm>
        <AddPaymentForm />
      </CardWithForm>
    </section>
  )
}
