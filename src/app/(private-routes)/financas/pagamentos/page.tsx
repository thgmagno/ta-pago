import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'
import { MonthYearSelector } from '@/components/MonthYearSelector'
import { extractMonthsAndYears } from '@/lib/utils'

export default async function PaymentsPage() {
  const transactions = await actions.transactions.payment.findAll()
  const { months, years } = extractMonthsAndYears(transactions.data ?? [])

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
