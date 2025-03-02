import { Page } from '@/components/common/Page'
import { CreateTransaction } from '@/components/forms/CreateTransaction'
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
        <CreateTransaction type="payment" />
      </Page>
    )
  }

  if (slug === 'recebimentos') {
    return (
      <Page>
        <CreateTransaction type="receipt" />
      </Page>
    )
  }

  if (slug === 'reservas') {
    return (
      <Page>
        <CreateTransaction type="reserve" />
      </Page>
    )
  }
}
