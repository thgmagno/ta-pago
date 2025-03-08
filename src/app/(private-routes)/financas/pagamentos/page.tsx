import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'
import { MonthYearSelector } from '@/components/MonthYearSelector'
import { Payment } from '@prisma/client'

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

function extractMonthsAndYears(transactions: Payment[]) {
  const months = Array.from(
    new Set(
      transactions.map((t) => t.scheduledDate.toISOString().slice(5, 7)) || [],
    ),
  ).sort((a, b) => {
    const aMonthIndex = parseInt(a, 10) - 1
    const bMonthIndex = parseInt(b, 10) - 1
    return aMonthIndex - bMonthIndex
  })

  const years = Array.from(
    new Set(
      transactions.map((t) => t.scheduledDate.toISOString().slice(0, 4)) || [],
    ),
  ).sort((a, b) => Number(a) - Number(b))

  return { months, years }
}
