import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import clsx from 'clsx'
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
      <Link
        href="/financas/pagamentos/adicionar"
        className={clsx('ml-auto', buttonVariants({ variant: 'outline' }))}
      >
        Adicionar
      </Link>
      <DataTable columns={columns} data={transactions.data ?? []} />
    </section>
  )
}
