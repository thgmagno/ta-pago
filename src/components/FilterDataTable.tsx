'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function FilterDataTable() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const onSelectDisplayChange = (value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString())

    if (value === 'All') {
      currentParams.delete('visualizar')
    } else if (value === 'Excluded') {
      currentParams.set('visualizar', 'excluidos')
    }

    router.push(`${pathname}?${currentParams.toString()}`)
  }

  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground ml-1 text-xs">Exibição: </span>
        <Select defaultValue="All" onValueChange={onSelectDisplayChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">Padrão</SelectItem>
              <SelectItem value="Excluded">Excluídos</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
