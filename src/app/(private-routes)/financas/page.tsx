import { CreditCard, Calendar, Coins, Grid2X2Plus } from 'lucide-react'
import Link from 'next/link'

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
    {
      title: 'Categorias',
      url: '/financas/categorias',
      icon: Grid2X2Plus,
    },
  ]

  return (
    <section>
      <div className="flex flex-col">
        {items.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="hover:text-emerald-500 hover:underline"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
