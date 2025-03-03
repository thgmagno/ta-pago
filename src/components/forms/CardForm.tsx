'use client'

import * as React from 'react'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function CardWithForm({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Card className="mx-auto max-w-4xl sm:w-[90%]">
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function CardWithFooter({
  onCancelRedirectTo,
  isPending,
}: {
  onCancelRedirectTo: string
  isPending: boolean
}) {
  const { replace } = useRouter()

  return (
    <CardFooter className="mt-5 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
      <Button
        type="button"
        onClick={() => replace(onCancelRedirectTo)}
        variant="outline"
        className="w-full md:w-fit"
      >
        Cancelar
      </Button>
      <Button type="submit" disabled={isPending} className="w-full md:w-fit">
        {isPending ? 'Salvando...' : 'Salvar'}
      </Button>
    </CardFooter>
  )
}
