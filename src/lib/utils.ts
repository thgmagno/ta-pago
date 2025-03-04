import { clsx, type ClassValue } from 'clsx'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function redirectIfInvalidId(id?: string | null, redirectUrl = '/') {
  if (!id || typeof id !== 'string' || !/^\w{10,}$/.test(id))
    redirect(redirectUrl)
  return id
}

export function formatCurrencyBRL(amount?: number | null) {
  if (!amount) return null
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

export function formatDateBR(date?: Date | null) {
  if (!date) return null
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(date)
}

export const calculateDifferenceBetweenDates = (
  startDate: Date,
  endDate?: Date | null,
) => {
  if (!startDate) return '-'

  const periodo = formatDistance(startDate, endDate ?? new Date(), {
    locale: ptBR,
  })
  return periodo
}

export const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setUTCHours(12, 0, 0, 0)
  return date
}
