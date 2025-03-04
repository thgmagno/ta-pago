import { actions } from '@/actions'
import { CardWithForm } from '@/components/forms/CardForm'
import { EditCategoryForm } from '@/components/forms/EditCategoryForm'

export default async function EditPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const category = await actions.categories.category.findUnique(id)

  return (
    <section className="page">
      <CardWithForm>
        <EditCategoryForm category={category} />
      </CardWithForm>
    </section>
  )
}
