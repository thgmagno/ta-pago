import Link from 'next/link'

interface ItemGridProps {
  item: {
    title: string
    url: string
    icon: React.ElementType
  }
}

export function ItemGrid({ item }: ItemGridProps) {
  return (
    <Link
      key={item.title}
      href={item.url}
      className="bg-card flex flex-col items-center justify-center gap-3 rounded-xl px-5 py-7 text-sm md:text-base"
    >
      <item.icon />
      <span>{item.title}</span>
    </Link>
  )
}
