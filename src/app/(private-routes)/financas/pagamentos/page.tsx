import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'
import { FilterDataTable } from '@/components/FilterDataTable'
import { SearchParams } from '@/lib/types'

export default async function PaymentsPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const displayExcludeds = searchParams.visualizar === 'excluidos'

  const transactions = await actions.transactions.payment.findAll({
    displayExcludeds,
  })

  return (
    <section className="page">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <FilterDataTable />
        <Link
          href="/financas/pagamentos/adicionar"
          className={clsx(buttonVariants({ variant: 'outline' }))}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={columns} data={transactions.data ?? []} />
    </section>
  )
}
