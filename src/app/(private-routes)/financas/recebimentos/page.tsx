import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'

export default async function ReceiptsPage() {
  const transactions = await actions.transactions.receipt.findAll()

  return (
    <section className="page">
      <Link
        href="/financas/recebimentos/adicionar"
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
