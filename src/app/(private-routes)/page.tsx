import { auth } from '@/auth'
import { Page } from '@/components/common/Page'

export default async function IndexPage() {
  const user = await auth().then((session) => session?.user)

  return (
    <Page>
      <></>
    </Page>
  )
}
