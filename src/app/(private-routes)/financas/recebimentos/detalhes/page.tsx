import { actions } from '@/actions'
import { CardWithForm } from '@/components/forms/CardForm'
import { Button, buttonVariants } from '@/components/ui/button'
import { dict } from '@/lib/dict'
import { SearchParams } from '@/lib/types'
import {
  formatCurrencyBRL,
  formatDateBR,
  redirectIfInvalidId,
} from '@/lib/utils'
import { Label } from '@/components/ui/label'
import clsx from 'clsx'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export default async function DetailsReceiptPage(props: {
  searchParams: SearchParams
}) {
  const baseUrl = '/financas/recebimentos'
  const searchParams = await props.searchParams
  const receipt = await actions.transactions.receipt.findUnique(
    redirectIfInvalidId(searchParams.id, baseUrl),
  )
  const editUrl = `/financas/recebimentos/editar?id=${receipt.id}`

  return (
    <section className="page">
      <Link
        href={baseUrl}
        className={clsx('ml-auto', buttonVariants({ variant: 'outline' }))}
      >
        Voltar
      </Link>
      <CardWithForm>
        <form className="flex flex-col space-y-3.5 opacity-95">
          {/* Tipo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Tipo:</Label>
            <p>
              {receipt.transaction?.type
                ? dict.TransactionTypes[receipt.transaction.type]
                : 'Não informado'}
            </p>
          </div>

          <Separator />

          {/* Descricao */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Descrição:</Label>
            <p>{receipt.transaction?.description}</p>
          </div>

          <Separator />

          {/* Categoria */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Categoria:</Label>
            <p>{receipt?.transaction?.category?.name ?? '-'}</p>
          </div>

          <Separator />

          {/* Data de registro */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data de registro:</Label>
            <p>{formatDateBR(receipt.transaction?.creationDate)}</p>
          </div>

          <Separator />

          {/* Data do recebimento */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data do recebimento:</Label>
            <p>
              {receipt?.receivedAt ? formatDateBR(receipt?.receivedAt) : '-'}
            </p>
          </div>

          <Separator />

          {/* Data do vencimento */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data do vencimento:</Label>
            <p>
              {receipt?.scheduledDate
                ? formatDateBR(receipt?.scheduledDate)
                : '-'}
            </p>
          </div>

          <Separator />

          {/* Valor */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Valor:</Label>
            <p>{formatCurrencyBRL(receipt?.amount)}</p>
          </div>

          <Separator />

          {/* Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Status:</Label>
            <p>
              {receipt?.status
                ? dict.ReceiptStatus.find((r) => r.value === receipt.status)
                    ?.label
                : '-'}
            </p>
          </div>

          <Separator />

          {/* Metodo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Método de recebimento:</Label>
            <p>
              {receipt?.receiptMethod
                ? dict.PaymentMethods.find(
                    (p) => p.value === receipt?.receiptMethod,
                  )?.label
                : '-'}
            </p>
          </div>

          <Separator />
        </form>
        <div className="mt-5 flex items-center justify-end gap-3">
          <Button size="sm" variant="destructive">
            Excluir
          </Button>
          <Link href={editUrl} className={buttonVariants({ size: 'sm' })}>
            Editar
          </Link>
        </div>
      </CardWithForm>
    </section>
  )
}
