import { AddButton } from '@/components/common/AddButton'
import { Page } from '@/components/common/Page'
import { redirect } from 'next/navigation'

export default async function FinanceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const allowedSlugs = ['pagamentos', 'recebimentos', 'reservas']

  if (!allowedSlugs.includes(slug)) redirect('/financas')

  if (slug === 'pagamentos') {
    return (
      <Page>
        <AddButton href="/financas/pagamentos/adicionar" label="Adicionar" />
      </Page>
    )
  }

  if (slug === 'recebimentos') {
    return (
      <Page>
        <AddButton href="/financas/recebimentos/adicionar" label="Adicionar" />
      </Page>
    )
  }

  if (slug === 'reservas') {
    return (
      <Page>
        <AddButton href="/financas/reservas/adicionar" label="Adicionar" />
      </Page>
    )
  }
}
