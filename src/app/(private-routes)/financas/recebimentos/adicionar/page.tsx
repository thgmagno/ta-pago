import { actions } from '@/actions'
import { AddReceiptForm } from '@/components/forms/AddReceiptForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function AddReceiptPage() {
  const { receiptCategories } = await actions.categories.category.findAll()

  return (
    <section className="page">
      <CardWithForm>
        <AddReceiptForm categories={receiptCategories?.data ?? []} />
      </CardWithForm>
    </section>
  )
}
