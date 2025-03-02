import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function AddButton({
  label,
  href = 'Adicionar',
}: {
  label: string
  href: string
}) {
  return (
    <div className="mb-5 flex justify-end">
      <Link href={href} className={buttonVariants({ variant: 'secondary' })}>
        {label}
      </Link>
    </div>
  )
}
