import { actions } from '@/actions'
import { CardWithForm } from '@/components/forms/CardForm'
import { buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { dict } from '@/lib/dict'
import { SearchParams } from '@/lib/types'
import {
  formatCurrencyBRL,
  formatDateBR,
  redirectIfInvalidId,
} from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import Link from 'next/link'
import { TransactionDetailsManager } from '@/components/TransactionDetailsManager'

export default async function DetailsPaymentPage(props: {
  searchParams: SearchParams
}) {
  const baseUrl = '/financas/pagamentos'
  const searchParams = await props.searchParams
  const payment = await actions.transactions.payment.findUnique(
    redirectIfInvalidId(searchParams.id, baseUrl),
  )
  const editUrl = `/financas/pagamentos/editar?id=${payment.id}`

  return (
    <section className="page">
      <Link
        href={baseUrl}
        className={clsx('ml-auto', buttonVariants({ variant: 'outline' }))}
      >
        Voltar
      </Link>
      <CardWithForm>
        <form className="flex flex-col space-y-2.5 opacity-95">
          {/* Tipo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Tipo:</Label>
            <p>
              {payment.transaction?.type
                ? dict.TransactionTypes[payment.transaction.type]
                : 'Não informado'}
            </p>
          </div>

          <Separator />

          {/* Descricao */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Descrição:</Label>
            <p>{payment.transaction?.description}</p>
          </div>

          <Separator />

          {/* Categoria */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Categoria:</Label>
            <p>{payment?.transaction?.category?.name ?? '-'}</p>
          </div>

          <Separator />

          {/* Data de registro */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data de registro:</Label>
            <p>{formatDateBR(payment.transaction?.creationDate)}</p>
          </div>

          <Separator />

          {/* Data do pagamento */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data do pagamento:</Label>
            <p>{payment?.paidAt ? formatDateBR(payment?.paidAt) : '-'}</p>
          </div>

          <Separator />

          {/* Data do vencimento */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data do vencimento:</Label>
            <p>
              {payment?.scheduledDate
                ? formatDateBR(payment?.scheduledDate)
                : '-'}
            </p>
          </div>

          <Separator />

          {/* Valor */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Valor:</Label>
            <p>{formatCurrencyBRL(payment?.amount)}</p>
          </div>

          <Separator />

          {/* Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Status:</Label>
            <p>
              {payment?.status
                ? dict.PaymentStatus.find((p) => p.value === payment.status)
                    ?.label
                : '-'}
            </p>
          </div>

          <Separator />

          {/* Metodo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Método de pagamento:</Label>
            <p>
              {payment?.paymentMethod
                ? dict.PaymentMethods.find(
                    (p) => p.value === payment.paymentMethod,
                  )?.label
                : '-'}
            </p>
          </div>
          <Separator />
        </form>
        {payment.transaction?.id && (
          <TransactionDetailsManager
            transactionId={payment.transaction.id}
            editUrl={editUrl}
          />
        )}
      </CardWithForm>
    </section>
  )
}
