import { actions } from '@/actions'
import { CardCreateGroup } from '@/components/CardCreateGroup'
import { CardDetailsGroup } from '@/components/CardDetailsGroup'
import { CardFindGroup } from '@/components/CardFindGroup'

export default async function GroupPage() {
  const groupId = await actions.groups.group.getGroupIdBySession()

  return (
    <section className="page">
      {groupId ? (
        <CardDetailsGroup groupId={groupId} />
      ) : (
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-semibold">
            Quer dividir as finanças com mais praticidade?
          </h2>
          <div className="flex flex-wrap gap-4">
            <CardCreateGroup />
            <CardFindGroup />
          </div>
        </div>
      )}
    </section>
  )
}
