import { AddGroupForm } from '@/components/forms/AddGroupForm'
import { CardWithForm } from '@/components/forms/CardForm'

export default async function CreateGroupPage() {
  return (
    <section className="page">
      <CardWithForm>
        <AddGroupForm />
      </CardWithForm>
    </section>
  )
}
