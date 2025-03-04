import { actions } from '@/actions'
import { buttonVariants } from '@/components/ui/button'
import { SearchParams } from '@/lib/types'
import { redirectIfInvalidId } from '@/lib/utils'
import clsx from 'clsx'
import Link from 'next/link'

export default async function DetailsPaymentPage(props: {
  searchParams: SearchParams
}) {
  const baseUrl = '/financas/pagamentos'
  const searchParams = await props.searchParams
  const payment = await actions.transactions.payment.findUnique(
    redirectIfInvalidId(searchParams.id, baseUrl),
  )

  return (
    <section className="page">
      <Link
        href={baseUrl}
        className={clsx(
          'ml-auto',
          buttonVariants({ variant: 'outline', size: 'sm' }),
        )}
      >
        Voltar
      </Link>
      <pre>{JSON.stringify(payment, null, 2)}</pre>
    </section>
  )
}
