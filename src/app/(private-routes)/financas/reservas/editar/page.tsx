import { actions } from '@/actions'
import { CardWithForm } from '@/components/forms/CardForm'
import { EditReserveForm } from '@/components/forms/EditReserveForm'
import { SearchParams } from '@/lib/types'
import { redirectIfInvalidId } from '@/lib/utils'

export default async function EditReservePage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const reserve = await actions.transactions.reserve.findUnique(
    redirectIfInvalidId(searchParams.id, '/financas/recebimentos'),
  )

  return (
    <section className="page">
      <CardWithForm>
        <EditReserveForm reserve={reserve} />
      </CardWithForm>
    </section>
  )
}
