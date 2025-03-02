import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default async function DetailsReservePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <section>
      <div className="flex items-center justify-end">
        <Link
          href="/financas/reservas"
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Voltar
        </Link>
      </div>
      <p>Reserve {id}</p>
    </section>
  )
}
