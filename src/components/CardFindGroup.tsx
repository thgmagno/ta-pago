import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { FindGroupForm } from './forms/FindGroupForm'

export function CardFindGroup() {
  return (
    <Card className="max-h-fit max-w-4xl rounded-2xl border p-4 pb-7 shadow-md">
      <CardHeader className="flex flex-row items-center gap-3">
        <Search className="text-primary h-8 w-8" />
        <CardTitle className="text-lg font-semibold">Buscar um grupo</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Junte-se a grupos existentes e organize suas finanças de forma simples
          e eficiente!
        </p>
        <FindGroupForm />
      </CardContent>
    </Card>
  )
}
