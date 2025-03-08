import { Payment, Receipt, Reserve } from '@prisma/client'
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
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount ?? 0)
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

export function getUserName(username?: string | null) {
  if (!username) return 'Bem-vindo!'
  const nameSplited = username.split(' ')
  const firstName = nameSplited.shift()
  const lastName = nameSplited.pop()
  return `${firstName} ${lastName || ''}`.trim()
}

type Generic = Payment | Receipt | Reserve

export function extractMonthsAndYears<T extends Generic>(transactions: T[]) {
  const dateKey = (transaction: T) =>
    'scheduledDate' in transaction
      ? transaction.scheduledDate
      : transaction.startDate

  const months = Array.from(
    new Set(
      transactions.map((t) => dateKey(t)?.toISOString().slice(5, 7)) || [],
    ),
  )

  const years = Array.from(
    new Set(
      transactions.map((t) => dateKey(t)?.toISOString().slice(0, 4)) || [],
    ),
  )

  const currentMonth = new Date().toISOString().slice(5, 7)
  const currentYear = new Date().toISOString().slice(0, 4)

  if (!months.includes(currentMonth)) {
    months.push(currentMonth)
  }

  if (!years.includes(currentYear)) {
    years.push(currentYear)
  }

  months.sort((a, b) => {
    const aMonthIndex = parseInt(a, 10) - 1
    const bMonthIndex = parseInt(b, 10) - 1
    return aMonthIndex - bMonthIndex
  })
  years.sort((a, b) => Number(a) - Number(b))

  return { months, years }
}
