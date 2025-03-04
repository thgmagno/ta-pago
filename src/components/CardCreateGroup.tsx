import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import clsx from 'clsx'
import Link from 'next/link'
import { Users } from 'lucide-react'

export function CardCreateGroup() {
  return (
    <Card className="max-w-lg rounded-2xl border p-4 shadow-md">
      <CardHeader className="flex flex-row items-center gap-3">
        <Users className="text-primary h-8 w-8" />
        <CardTitle className="text-lg font-semibold">
          Compartilhe suas finanças com um grupo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Criar um grupo é ideal para gerenciar gastos compartilhados com
          amigos, familiares ou colegas. Acompanhe todas as transações em um só
          lugar!
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
