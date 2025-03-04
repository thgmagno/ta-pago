import { actions } from '@/actions'
import { CardWithForm } from '@/components/forms/CardForm'
import { Button, buttonVariants } from '@/components/ui/button'
import { dict } from '@/lib/dict'
import { SearchParams } from '@/lib/types'
import {
  calculateDifferenceBetweenDates,
  formatCurrencyBRL,
  formatDateBR,
  redirectIfInvalidId,
} from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import Link from 'next/link'

export default async function DetailsReservePage(props: {
  searchParams: SearchParams
}) {
  const baseUrl = '/financas/reservas'
  const searchParams = await props.searchParams
  const reserve = await actions.transactions.reserve.findUnique(
    redirectIfInvalidId(searchParams.id, baseUrl),
  )
  const editUrl = `/financas/reservas/editar?id=${reserve.id}`

  return (
    <section className="page">
      <Link
        href={baseUrl}
        className={clsx(
          'ml-auto',
          buttonVariants({ variant: 'outline', size: 'sm' }),
        )}
      >
        Voltar
      </Link>
      <CardWithForm>
        <form className="flex flex-col space-y-3.5 opacity-95">
          {/* Tipo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Tipo:</Label>
            <p className="col-span-3">
              {reserve.transaction?.type
                ? dict.TransactionTypes[reserve.transaction.type]
                : 'Não informado'}
            </p>
          </div>

          <Separator />

          {/* Descricao */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Descrição:</Label>
            <p className="col-span-3">{reserve.transaction?.description}</p>
          </div>

          <Separator />

          {/* Categoria */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Categoria:</Label>
            <p className="col-span-3">
              {reserve?.transaction?.category?.name ?? '-'}
            </p>
          </div>

          <Separator />

          {/* Data de registro */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data de registro:</Label>
            <p className="col-span-3">
              {formatDateBR(reserve.transaction?.creationDate)}
            </p>
          </div>

          <Separator />

          {/* Data de início */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data de início:</Label>
            <p className="col-span-3">
              {reserve?.startDate ? formatDateBR(reserve?.startDate) : '-'}
            </p>
          </div>

          <Separator />

          {/* Data de término */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Data de término:</Label>
            <p className="col-span-3">
              {reserve?.endDate ? formatDateBR(reserve?.endDate) : '-'}
            </p>
          </div>

          <Separator />

          {/* Duração */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Duração:</Label>
            <p className="col-span-3">
              {reserve?.startDate
                ? calculateDifferenceBetweenDates(
                    reserve.startDate,
                    reserve?.endDate,
                  )
                : '-'}
            </p>
          </div>

          <Separator />

          {/* Valor inicial */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Valor inicial:</Label>
            <p className="col-span-3">{formatCurrencyBRL(reserve?.amount)}</p>
          </div>

          <Separator />

          {/* Rentabilidade */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Rentabilidade:</Label>
            <p className="col-span-3">{formatCurrencyBRL(reserve?.yield)}</p>
          </div>

          <Separator />

          {/* Valor final */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Valor final:</Label>
            <p className="col-span-3">
              {formatCurrencyBRL(
                (reserve?.amount ?? 0) + (reserve?.yield ?? 0),
              )}
            </p>
          </div>

          <Separator />

          {/* Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-semibold">Status:</Label>
            <p className="col-span-3">
              {reserve?.status
                ? dict.ReserveStatus.find((r) => r.value === reserve.status)
                    ?.label
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
