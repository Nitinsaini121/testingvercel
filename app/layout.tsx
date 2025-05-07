import AuthProvider from '@/contexts/auth-provider'
import QueryProvider from '@/contexts/query-provider'
import { ThemeProvider } from '@/contexts/theme-provider'
import { authOptions } from '@/lib/auth'
import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { PropsWithChildren } from 'react'

import { AppBreadcrumb } from '@/components/app-breadcrumb'
import Navbar from '@/components/catalog-items/NavBar'
import { Toaster } from '@/components/ui/toaster'
import UserContextProvider from '@/contexts/user-contextprovider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | CRM',
    default: 'Admin | CRM'
  }
}

export default async function AdminRootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  return (
    <html suppressHydrationWarning lang='en'>
      <body
        suppressHydrationWarning
        className={cn(inter.className, 'antialiased')}
      >
        <UserContextProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <AuthProvider session={session}>
                <Toaster />
                <Navbar />
                {/* <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'> */}
                  {/* <div className='container m-auto'> */}
                    {/* <div className='flex items-center gap-2 pt-12'> */}
                      {/* <Separator orientation='vertical' className='mr-2 h-4' /> */}
                      {/* <AppBreadcrumb /> */}
                    {/* </div> */}
                  {/* </div> */}
                {/* </header> */}
                <main className='min-h-screen'>
                  <Toaster />
                  {/* <LayoutHeader pageTitle='qwertyu'/> */}
                  {children}
                </main>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </UserContextProvider>
      </body>
    </html>
  )
}
