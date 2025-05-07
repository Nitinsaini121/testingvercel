
import { Toaster } from '@/components/ui/toaster'

export default async function AdminDashboardLayout({
  children
}) {

  return (
    <>
      <div>
        <header className='flex shrink-0 items-center justify-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex flex-col flex-wrap items-center gap-2 px-4 pt-3 mt-5 bg-black ' >
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
