import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'

export default async function PaymentsPage() {
  const transactions = await actions.transactions.payment.findAll()

  return (
    <section className="page">
      <Link
        href="/financas/pagamentos/adicionar"
        className={clsx(
          'ml-auto',
          buttonVariants({ variant: 'outline', size: 'sm' }),
        )}
      >
        Adicionar
      </Link>
      <DataTable columns={columns} data={transactions.data ?? []} />
    </section>
  )
}
