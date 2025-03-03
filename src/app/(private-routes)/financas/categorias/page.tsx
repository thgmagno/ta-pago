import { DataTable } from '@/components/DataTable'
import { paymentColumns } from './paymentColumns'
import { dict } from '@/lib/dict'
import { receiptColumns } from './receiptColumns'
import { actions } from '@/actions'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function CategoriesPage() {
  const { paymentCategories } = await actions.categories.category.findAll()

  return (
    <section className="page">
      {/* Categories Payment */}
      <div className="flex items-center justify-between">
        <span>
          Categorias de pagamento:{' '}
          {String(paymentCategories.data?.length ?? 0).padStart(2, '0')}
        </span>
        <Link
          href="/financas/categorias/adicionar"
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Adicionar
        </Link>
      </div>
      <DataTable columns={paymentColumns} data={paymentCategories.data ?? []} />

      {/* Categories Receipt */}
      <div className="flex flex-col">
        <span>
          Categorias de recebimento:{' '}
          {String(dict.ReceiptMethods.length ?? 0).padStart(2, '0')}
        </span>
        <small className="text-muted-foreground mt-2">
          No momento, as categorias de recebimento não podem ser editadas ou
          sobrescritas.
        </small>
      </div>
      <DataTable columns={receiptColumns} data={dict.ReceiptMethods} />
    </section>
  )
}
