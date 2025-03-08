import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'
import { MonthYearSelector } from '@/components/MonthYearSelector'

export default async function ReceiptsPage() {
  const transactions = await actions.transactions.receipt.findAll()

  return (
    <section className="page">
      <div className="flex items-center justify-between">
        <MonthYearSelector />
        <Link
          href="/financas/recebimentos/adicionar"
          className={clsx('ml-auto', buttonVariants({ variant: 'outline' }))}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={columns} data={transactions.data ?? []} />
    </section>
  )
}
