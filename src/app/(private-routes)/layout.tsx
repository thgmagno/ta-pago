import { auth } from '@/auth'
import { AppSidebar } from '@/components/AppSidebar'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) redirect('/entrar')

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <Breadcrumb />
        {children}
      </div>
    </SidebarProvider>
  )
}
