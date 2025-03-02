import { DataTable } from '@/components/DataTable'
import { columns, Reserve } from './columns'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function ReservesPage() {
  async function getData(): Promise<Reserve[]> {
    return [
      {
        id: '728ed52f',
        amount: 800,
        status: 'pending',
        category: 'Renda fixa',
      },
      {
        id: '489e1d42',
        amount: 500,
        status: 'success',
        category: 'Fundo Imobiliário',
      },
    ]
  }

  const data = await getData()

  return (
    <section>
      <div className="flex items-center justify-between">
        <span>Reservas</span>
        <Link
          href="/financas/reservas/adicionar"
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </section>
  )
}
