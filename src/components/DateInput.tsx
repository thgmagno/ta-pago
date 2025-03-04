'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  name: string
  defaultValue?: Date | null
  disabled?: boolean
}

export function DateInput({ name, defaultValue, disabled }: Props) {
  const [date, setDate] = React.useState<Date>(defaultValue ?? new Date())

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          {disabled ? (
            <Button variant={'outline'} disabled className="flex-1">
              Indeterminado
            </Button>
          ) : (
            <Button
              variant={'outline'}
              className={cn(
                'flex-1 justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon />
              {format(date, "d 'de' MMM 'de' yyyy", { locale: ptBR })}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => day && setDate(day)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <input name={name} value={format(date, 'yyyy-MM-dd')} type="hidden" />
    </>
  )
}
