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
import { ReceiptComplete } from '@/lib/types'
import { formatCurrencyBRL } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<ReceiptComplete>[] = [
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
      const receipt = row.original
      const status = dict.ReceiptStatus.find((r) => r.value === receipt.status)
      return (
        <Badge variant={status?.value === 'RECEIVED' ? 'default' : 'outline'}>
          {status ? status.label : 'Status desconhecido'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'transaction.description',
    header: 'Descrição',
    cell: ({ row }) => {
      const receipt = row.original

      return (
        <div className="capitalize">
          {receipt.transaction?.description ?? 'Sem descrição'}
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
      const receipt = row.original
      const editUrl = `/financas/recebimentos/editar?id=${receipt.id}`
      const detailsUrl = `/financas/recebimentos/detalhes?id=${receipt.id}`
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
              Editar recebimento
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
