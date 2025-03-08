import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import clsx from 'clsx'
import Link from 'next/link'
import { Users } from 'lucide-react'

export function CardCreateGroup() {
  return (
    <Card className="mb-0 max-h-fit max-w-lg rounded-2xl border p-4 pb-8 shadow-md">
      <CardHeader className="flex flex-row items-center gap-3">
        <Users className="text-primary h-8 w-8" />
        <CardTitle className="text-lg font-semibold">Criar um grupo</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Acompanhe todas as transações em um só lugar!
        </p>
        <Link
          href={'/grupo/criar'}
          className={clsx(
            'mt-4 block w-full text-center',
            buttonVariants({ variant: 'default', size: 'sm' }),
          )}
        >
          Criar um grupo
        </Link>
      </CardContent>
    </Card>
  )
}
