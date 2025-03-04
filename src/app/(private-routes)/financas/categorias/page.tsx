import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import { actions } from '@/actions'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'

export default async function CategoriesPage() {
  const { paymentCategories, receiptCategories, reservationCategories } =
    await actions.categories.category.findAll()

  return (
    <section className="page">
      <Link
        href={'/financas/categorias/adicionar'}
        className={clsx(
          'ml-auto w-fit',
          buttonVariants({ variant: 'outline' }),
        )}
      >
        Adicionar
      </Link>

      {/* Categories Payment */}
      <div className="flex items-center">
        <span>
          Categorias de pagamento:{' '}
          {String(paymentCategories.data?.length ?? 0).padStart(2, '0')}
        </span>
      </div>
      <DataTable columns={columns} data={paymentCategories.data ?? []} />

      {/* Categories Receipt */}
      <div className="flex items-center">
        <span>
          Categorias de recebimento:{' '}
          {String(receiptCategories.data?.length ?? 0).padStart(2, '0')}
        </span>
      </div>
      <DataTable columns={columns} data={receiptCategories.data ?? []} />

      {/* Categories Reserves */}
      <div className="flex items-center">
        <span>
          Categorias de reserva:{' '}
          {String(reservationCategories.data?.length ?? 0).padStart(2, '0')}
        </span>
      </div>
      <DataTable columns={columns} data={reservationCategories.data ?? []} />
    </section>
  )
}
