import { actions } from '@/actions'
import { CardWithForm } from '@/components/forms/CardForm'
import { EditCategoryForm } from '@/components/forms/EditCategoryForm'
import { SearchParams } from '@/lib/types'
import { redirectIfInvalidId } from '@/lib/utils'

export default async function EditPaymentPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const category = await actions.categories.category.findUnique(
    redirectIfInvalidId(searchParams.id, '/financas/categorias'),
  )

  return (
    <section className="page">
      <CardWithForm>
        <EditCategoryForm category={category} />
      </CardWithForm>
    </section>
  )
}
