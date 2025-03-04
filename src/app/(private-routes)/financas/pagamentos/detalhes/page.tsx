import { buttonVariants } from '@/components/ui/button'
import { SearchParams } from '@/lib/types'
import clsx from 'clsx'
import Link from 'next/link'

export default async function DetailsPaymentPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams

  return (
    <section className="page">
      <Link
        href="/financas/pagamentos"
        className={clsx(
          'ml-auto',
          buttonVariants({ variant: 'outline', size: 'sm' }),
        )}
      >
        Voltar
      </Link>
      <p>Payment {searchParams.id}</p>
    </section>
  )
}
