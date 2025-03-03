'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { dict } from '@/lib/dict'
import { Reserve } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<
  Reserve & {
    transaction: {
      description: string | null
      category: {
        name: string
      } | null
    } | null
  }
>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = dict.ReserveStatus.find(
        (r) => r.value === row.original.status,
      )
      return (
        <Badge variant={status?.value === 'ACTIVE' ? 'default' : 'outline'}>
          {status ? status.label : 'Status desconhecido'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'transaction.description',
    header: 'Descrição',
    cell: ({ row }) => {
      const reservation = row.original

      return (
        <div className="capitalize">
          {reservation.transaction?.description ?? 'Sem descrição'}
        </div>
      )
    },
  },
  {
    accessorKey: 'transaction.category.name',
    header: 'Categoria',
    cell: ({ row }) => {
      const categoryName = row.original.transaction?.category?.name
      return <div>{categoryName || 'Sem categoria'}</div>
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const reserve = row.original
      const editUrl = `/financas/reservas/${reserve.id}`
      const detailsUrl = `/financas/reservas/detalhes/${reserve.id}`
      const { replace } = useRouter()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-end">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => replace(editUrl)}>
              Editar reserva
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => replace(detailsUrl)}>
              Visualizar detalhes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
