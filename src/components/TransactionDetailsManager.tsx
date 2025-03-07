'use client'

import { actions } from '@/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  transactionId: string
  editUrl: string
}

export function TransactionDetailsManager({ transactionId, editUrl }: Props) {
  return (
    <div className="mt-5 flex items-center justify-end gap-3">
      <form
        action={() =>
          actions.transactions.transaction.setExcluded(transactionId)
        }
      >
        <Button size="sm" variant="destructive">
          Excluir
        </Button>
      </form>
      <Link href={editUrl} className={buttonVariants({ size: 'sm' })}>
        Editar
      </Link>
    </div>
  )
}
