import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'

export default async function PaymentsPage() {
  const transactions = await actions.transactions.payment.findAll()

  console.log(transactions)

  return (
    <section className="page">
      <div className="flex items-center justify-between">
        <span>Pagamentos</span>
        <Link
          href="/financas/pagamentos/adicionar"
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={columns} data={transactions.data ?? []} />
    </section>
  )
}
