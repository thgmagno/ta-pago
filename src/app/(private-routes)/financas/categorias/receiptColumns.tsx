'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ReceiptMethodType } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

interface ReceiptColumProps {
  value: ReceiptMethodType
  label: string
}

export const receiptColumns: ColumnDef<ReceiptColumProps>[] = [
  {
    accessorKey: 'label',
    header: 'Descrição',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('label')}</div>
    ),
  },
]
