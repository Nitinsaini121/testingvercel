import { AppBreadcrumb } from '@/components/app-breadcrumb'
import { AppSidebar } from '@/components/app-sidebar/app-sidebar'
import DashboardFooter from '@/components/DashboardFooter'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function AdminDashboardLayout({
  children
}: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  if ((session?.user?.role as string) === "qualified_contractor") {
   redirect('/workorder');
  }

  return (
    <>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className='!bg-white'>
            <header className='shadow-[0_0_15px_-10px_black] border-color-grey border-b flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
              <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <AppBreadcrumb />
              </div>
            </header>
            <div className='mx-5 my-5 flex flex-1 flex-col gap-2 rounded-sm bg-white pt-0'>
                <Toaster />
              {children}
            </div>
            <DashboardFooter />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  )
}
