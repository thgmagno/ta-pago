import { buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'
import Link from 'next/link'

export default async function DetailsReservePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <section className="page">
      <Link
        href="/financas/reservas"
        className={clsx(
          'ml-auto',
          buttonVariants({ variant: 'outline', size: 'sm' }),
        )}
      >
        Voltar
      </Link>
      <p>Reserve {id}</p>
    </section>
  )
}
