'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function MonthYearSelector({
  months,
  years,
}: {
  months: string[]
  years: string[]
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentDate = new Date()
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
  const currentYear = String(currentDate.getFullYear())

  const selectedMonth = searchParams.get('mes')
  const selectedYear = searchParams.get('ano')

  const updateURL = (month: string, year: string) => {
    const params = new URLSearchParams()

    if (month === currentMonth) {
      params.delete('mes', month)
    } else {
      params.set('mes', month)
    }

    if (year === currentYear) {
      params.delete('ano', year)
    } else {
      params.set('ano', year)
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname
    replace(newUrl, { scroll: false })
  }

  const onMonthChange = (newMonth: string) => {
    if (newMonth === selectedMonth) return
    updateURL(newMonth, selectedYear ?? currentYear)
  }

  const onYearChange = (newYear: string) => {
    if (newYear === selectedYear) return
    updateURL(selectedMonth ?? currentMonth, newYear)
  }

  return (
    <div className="flex gap-2.5">
      <Select
        value={selectedMonth ?? currentMonth}
        onValueChange={onMonthChange}
      >
        <SelectTrigger className="w-[120px] capitalize">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {months.map((m) => (
              <SelectItem key={m} value={m} className="capitalize">
                {format(new Date(2000, Number(m) - 1, 1), 'MMMM', {
                  locale: ptBR,
                })}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={selectedYear ?? currentYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
