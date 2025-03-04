import { buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'
import Link from 'next/link'

export default async function DetailsReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

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
      <p>Receipt {id}</p>
    </section>
  )
}
