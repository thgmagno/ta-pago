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
import { ReservationComplete } from '@/lib/types'
import { formatCurrencyBRL } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<ReservationComplete>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      return (
        <div className="text-right font-medium">
          {formatCurrencyBRL(amount)}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const reserve = row.original
      const editUrl = `/financas/reservas/editar?id=${reserve.id}`
      const detailsUrl = `/financas/reservas/detalhes?id=${reserve.id}`
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
