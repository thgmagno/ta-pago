import { auth } from '@/auth'
import { ModeToggle } from '@/components/ModeToggle'
import { redirect } from 'next/navigation'
import { AccessAccount } from './AccessAccount'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (session?.user?.email || isSessionUpToDate(session?.expires)) {
    redirect('/')
  }

  return (
    <section className="mx-auto h-screen w-[90%] max-w-7xl">
      <div className="flex w-full items-center justify-end py-5">
        <div className="flex items-center gap-3">
          <ModeToggle />
          <AccessAccount />
        </div>
      </div>
      {children}
    </section>
  )
}

type ISODateString = string

function isSessionUpToDate(expires?: ISODateString): boolean {
  if (!expires) return false
  return new Date(expires) <= new Date()
}
