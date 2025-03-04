import { getServerSession } from '@/actions/models/session'
import { CardCreateGroup } from '@/components/CardCreateGroup'
import { CardDetailsGroup } from '@/components/CardDetailsGroup'

export default async function GroupPage() {
  const user = await getServerSession()

  return (
    <section className="page">
      {!user.groupId ? <CardCreateGroup /> : <CardDetailsGroup />}
    </section>
  )
}
