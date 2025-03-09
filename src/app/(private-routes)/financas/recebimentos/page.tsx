import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'
import { MonthYearSelector } from '@/components/MonthYearSelector'
import { SearchParams } from '@/lib/types'
import { Plus } from 'lucide-react'

export default async function ReceiptsPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const month = searchParams.mes
  const year = searchParams.ano

  const receipts = await actions.transactions.receipt.cached.findAll({
    month,
    year,
  })

  const { months, years } =
    await actions.transactions.receipt.cached.findAllMonthsAndYears()

  return (
    <section className="page">
      <div className="flex items-center justify-between gap-5">
        <MonthYearSelector months={months} years={years} />
        <Link
          href="/financas/recebimentos/adicionar"
          className={clsx('ml-auto', buttonVariants({ variant: 'outline' }))}
        >
          <Plus className="sm:hidden" />
          <span className="hidden sm:inline-flex">Adicionar</span>
        </Link>
      </div>
      <DataTable columns={columns} data={receipts} />
    </section>
  )
}
