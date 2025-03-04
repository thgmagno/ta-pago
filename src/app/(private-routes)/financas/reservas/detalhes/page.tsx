import { actions } from '@/actions'
import { buttonVariants } from '@/components/ui/button'
import { SearchParams } from '@/lib/types'
import { redirectIfInvalidId } from '@/lib/utils'
import clsx from 'clsx'
import Link from 'next/link'

export default async function DetailsReservePage(props: {
  searchParams: SearchParams
}) {
  const baseUrl = '/financas/reservas'
  const searchParams = await props.searchParams
  const reserve = await actions.transactions.reserve.findUnique(
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
      <pre>{JSON.stringify(reserve, null, 2)}</pre>
    </section>
  )
}
