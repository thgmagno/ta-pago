import { clsx, type ClassValue } from 'clsx'
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
