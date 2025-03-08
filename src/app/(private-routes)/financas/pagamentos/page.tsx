import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'
import { MonthYearSelector } from '@/components/MonthYearSelector'
import { SearchParams } from '@/lib/types'

export default async function PaymentsPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const month = searchParams.mes
  const year = searchParams.ano

  const transactions = await actions.transactions.payment.findAll({
    month,
    year,
  })

  // unificar chamada ao banco de dados
  const { months, years } =
    await actions.transactions.transaction.getMonthsAndYears('PAYMENT')

  return (
    <section className="page">
      <div className="flex items-center justify-between">
        <MonthYearSelector months={months} years={years} />
        <Link
          href="/financas/pagamentos/adicionar"
          className={clsx('ml-auto', buttonVariants({ variant: 'outline' }))}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={columns} data={transactions.data ?? []} />
    </section>
  )
}
