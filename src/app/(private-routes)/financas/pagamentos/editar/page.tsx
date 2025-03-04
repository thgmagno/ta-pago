import { actions } from '@/actions'
import { CardWithForm } from '@/components/forms/CardForm'
import { EditPaymentForm } from '@/components/forms/EditPaymentForm'
import { SearchParams } from '@/lib/types'
import { redirectIfInvalidId } from '@/lib/utils'

export default async function EditPaymentPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const payment = await actions.transactions.payment.findUnique(
    redirectIfInvalidId(searchParams.id, '/financas/pagamentos'),
  )

  return (
    <section className="page">
      <CardWithForm>
        <EditPaymentForm payment={payment} />
      </CardWithForm>
    </section>
  )
}
