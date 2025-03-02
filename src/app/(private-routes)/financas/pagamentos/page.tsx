import { DataTable } from '@/components/DataTable'
import { columns, Payment } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function PaymentsPage() {
  async function getData(): Promise<Payment[]> {
    return [
      {
        id: '728ed52f',
        amount: 100,
        status: 'pending',
        category: 'Mercado',
      },
      {
        id: '489e1d42',
        amount: 125,
        status: 'processing',
        category: 'Roupas',
      },
    ]
  }

  const data = await getData()

  return (
    <section>
      <div className="flex items-center justify-between">
        <span>Pagamentos</span>
        <Link
          href="/financas/pagamentos/adicionar"
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </section>
  )
}
