import { actions } from '@/actions'
import { CardWithForm } from '@/components/forms/CardForm'
import { EditReceiptForm } from '@/components/forms/EditReceiptForm'
import { SearchParams } from '@/lib/types'
import { redirectIfInvalidId } from '@/lib/utils'

export default async function EditReceiptPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const receipt = await actions.transactions.receipt.findUnique(
    redirectIfInvalidId(searchParams.id, '/financas/recebimentos'),
  )

  return (
    <section className="page">
      <CardWithForm>
        <EditReceiptForm receipt={receipt} />
      </CardWithForm>
    </section>
  )
}
