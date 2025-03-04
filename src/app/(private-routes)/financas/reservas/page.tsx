import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'

export default async function ReservesPage() {
  const transactions = await actions.transactions.reserve.findAll()

  return (
    <section className="page">
      <Link
        href="/financas/reservas/adicionar"
        className={clsx(
          'ml-auto',
          buttonVariants({ variant: 'outline' }),
        )}
      >
        Adicionar
      </Link>
      <DataTable columns={columns} data={transactions.data ?? []} />
    </section>
  )
}
