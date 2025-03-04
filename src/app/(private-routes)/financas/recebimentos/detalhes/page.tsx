import { buttonVariants } from '@/components/ui/button'
import { SearchParams } from '@/lib/types'
import clsx from 'clsx'
import Link from 'next/link'

export default async function DetailsReceiptPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams

  return (
    <section className="page">
      <Link
        href="/financas/recebimentos"
        className={clsx(
          'ml-auto',
          buttonVariants({ variant: 'outline', size: 'sm' }),
        )}
      >
        Voltar
      </Link>
      <p>Receipt {searchParams.id}</p>
    </section>
  )
}
