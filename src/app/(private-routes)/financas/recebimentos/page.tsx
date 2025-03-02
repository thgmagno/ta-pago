import { DataTable } from '@/components/DataTable'
import { columns, Receipt } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function ReceiptsPage() {
  async function getData(): Promise<Receipt[]> {
    return [
      {
        id: '728ed52f',
        amount: 1200,
        status: 'pending',
        category: 'Extras',
      },
      {
        id: '489e1d42',
        amount: 12500,
        status: 'success',
        category: 'Salário',
      },
    ]
  }

  const data = await getData()

  return (
    <section>
      <div className="flex items-center justify-between">
        <span>Recebimentos</span>
        <Link
          href="/financas/recebimentos/adicionar"
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </section>
  )
}
