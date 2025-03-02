import { AddReceiptForm } from '@/components/forms/AddReceiptForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddReceiptPage() {
  return (
    <section>
      <span>Adicionar recebimento</span>
      <CardWithForm>
        <AddReceiptForm />
      </CardWithForm>
    </section>
  )
}
