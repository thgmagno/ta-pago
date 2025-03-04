import { actions } from '@/actions'
import { buttonVariants } from '@/components/ui/button'
import { SearchParams } from '@/lib/types'
import { redirectIfInvalidId } from '@/lib/utils'
import clsx from 'clsx'
import Link from 'next/link'

export default async function DetailsReceiptPage(props: {
  searchParams: SearchParams
}) {
  const baseUrl = '/financas/recebimentos'
  const searchParams = await props.searchParams
  const receipt = await actions.transactions.receipt.findUnique(
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
      <pre>{JSON.stringify(receipt, null, 2)}</pre>
    </section>
  )
}
