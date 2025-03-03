import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'

export default async function ReservesPage() {
  const transactions = await actions.transactions.reserve.findAll()

  return (
    <section className="page">
      <div className="flex items-center justify-between">
        <span>Reservas</span>
        <Link
          href="/financas/reservas/adicionar"
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={columns} data={transactions.data ?? []} />
    </section>
  )
}
