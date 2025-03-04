import { AppSidebar } from '@/components/AppSidebar'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
