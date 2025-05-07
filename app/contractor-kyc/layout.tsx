import { Toaster } from '@/components/ui/toaster'
import { PropsWithChildren } from 'react'

export default async function AdminDashboardLayout({
  children
}: PropsWithChildren) {
  return (
    <>
      <div>
        <header className='flex shrink-0 items-center justify-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='mt-5 flex flex-col flex-wrap items-center gap-2 bg-black px-4 pt-3'>
          <img src='/images/fortress-logo.png' className='!w-56'></img>
          </div>
        </header>
        <div className='mx-auto my-5 flex max-w-5xl flex-1 flex-col rounded-sm bg-white shadow-[0_0_15px_-10px_black]'>
          <Toaster />
          {children}
        </div>
      </div>
    </>
  )
}
