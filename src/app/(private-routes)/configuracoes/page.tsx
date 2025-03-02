import { Page } from '@/components/common/Page'
import { UserInfo } from '@/components/common/UserInfo'
import { ModeSelect } from '@/components/ModeToggle'

export default async function SettingsPage() {
  return (
    <Page>
      <ModeSelect />
      <UserInfo />
    </Page>
  )
}
