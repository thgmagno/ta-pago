import { Page } from '@/components/common/Page'
import { CreditCard, Calendar, Coins } from 'lucide-react'
import { ItemGrid } from '@/components/grid/ItemGrid'
import { Grid } from '@/components/grid'

export default function FinancePage() {
  const items = [
    {
      title: 'Pagamentos',
      url: '/financas/pagamentos',
      icon: CreditCard,
    },
    {
      title: 'Recebimentos',
      url: '/financas/recebimentos',
      icon: Coins,
    },
    {
      title: 'Reservas',
      url: '/financas/reservas',
      icon: Calendar,
    },
  ]

  return (
    <Page>
      <Grid>
        {items.map((item) => (
          <ItemGrid key={item.title} item={item} />
        ))}
      </Grid>
    </Page>
  )
}
