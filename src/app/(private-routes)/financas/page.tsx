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
    <section className="page">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="bg-sidebar m-2 flex flex-col items-center justify-center gap-4 rounded-xl border px-3 py-6 transition-all duration-200 not-hover:opacity-75 hover:scale-102"
          >
            <item.icon className="mr-2" /> {item.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
