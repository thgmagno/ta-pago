'use client'

import { ReceiptMethodType } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

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
