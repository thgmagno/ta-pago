'use client'

import * as React from 'react'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { useSession } from 'next-auth/react'

export function CardWithForm({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) {
  return (
    <Card className={`mx-auto w-full max-w-4xl sm:w-[90%] ${className || ''}`}>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function CardWithFooter({
  onCancelRedirectTo,
  isPending,
  transactionGroupIp,
  isEdition,
  isOwner,
}: {
  onCancelRedirectTo: string
  isPending: boolean
  transactionGroupIp?: string | null
  isEdition?: boolean
  isOwner?: boolean
}) {
  const { data } = useSession()
  const [isShared, setIsShared] = React.useState(
    isEdition ? !!transactionGroupIp : !!data?.user.groupId,
  )
  const { replace } = useRouter()

  return (
    <CardFooter className="mt-5 flex flex-col justify-between lg:flex-row">
      {isOwner && data?.user.groupId && (
        <div className="mb-5 w-full md:mb-0">
          <input
            type="hidden"
            name="isShared"
            value={isShared ? 'true' : 'false'}
          />
          <span className="flex items-center gap-2">
            <Checkbox
              checked={isShared}
              onCheckedChange={() => setIsShared(!isShared)}
              className="h-5 w-5"
            />
            {isShared ? 'Visível para o grupo' : 'Visível apenas para você'}
          </span>
        </div>
      )}
      <div className="flex w-full flex-col-reverse gap-3 md:ml-auto md:w-fit md:flex-row">
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
      </div>
    </CardFooter>
  )
}
