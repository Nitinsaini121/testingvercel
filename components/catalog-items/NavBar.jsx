'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown, CircleUserRound, LogOutIcon, Menu } from 'lucide-react'
import { nanoid } from 'nanoid'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
const Navbar = () => {
  const [favOpen, setFavOpen] = useState(false)
  const [compOpen, setCompOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const { data: session } = useSession()
  const [open, SetOpen] = useState(false)
  const pathName = usePathname()
  const hiddenPaths = new Set([
    '/login',
    '/contractor-kyc',
    '/materialVerification',
    '/contractor-kyc/thankspage',
    '/materialVerification/thankspage'
  ])

  if (hiddenPaths.has(pathName) || pathName.startsWith('/dashboard')) {
    return null
  }
  return (
    <div className='theme-bg shadow-md'>
      {/* Navbar */}
      <Card className='theme-bg container m-auto flex items-center justify-between px-6 py-4'>
        {/* Logo */}
        <div className='text-2xl font-bold text-primary'>
          <Link href='/'>
            <img
              src='/images/fortress-logo.png'
              alt='Roofing Product'
              className='h-20 w-full object-cover'
            />
          </Link>
        </div>
        {/* Nav Items */}
        <ul className='hidden items-center gap-6 font-medium text-white md:flex'>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className='flex cursor-pointer items-center gap-1'>
                  Roofing Pros <ChevronDown />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='start'
                className='rounded-md bg-white p-2 shadow-lg'
              >
                {landings.map(page => (
                  <DropdownMenuItem key={page.id}>
                    <Link href={page.route}>{page.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <a href='/catalog'>Catalog</a>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className='flex cursor-pointer items-center gap-1'>
                  Company <ChevronDown />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='start'
                className='rounded-md bg-white p-2 shadow-lg'
              >
                {landings.map(page => (
                  <DropdownMenuItem key={page.id}>
                    <Link href={page.route}>{page.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <a href='#contact'>Contact Us</a>
          </li>
        </ul>
        {/* Icons */}
        <div className='hidden items-center gap-4 md:flex'>
          {/* <OctagonAlert
            onClick={() => setHelpOpen(!helpOpen)}
            className='cursor-pointer text-gray-600'
          />
          <ArrowDownUp
            onClick={() => setCompOpen(!compOpen)}
            className='cursor-pointer text-gray-600'
          />
          <Heart
            onClick={() => setFavOpen(!favOpen)}
            className='cursor-pointer text-gray-600'
          
            
          /> */}
          <div className='text-white'>{session?.user?.email}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className='cursor-pointer text-white' />
            </DropdownMenuTrigger>
            {session ? (
              <>
                {' '}
                <DropdownMenuContent
                  align='end'
                  className='rounded-md bg-white p-2 shadow-lg'
                >
                  <DropdownMenuItem>
                    {session?.user?.firstName}
                    {session?.user?.lastName}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {session?.user?.role === 'qualified_contractor' ? (
                      <>
                        {' '}
                        <a href='/workorder'>Work Order</a>
                      </>
                    ) : (
                      <>
                        {' '}
                        <a href='/dashboard'>Dashboard</a>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='cursor-pointer text-destructive'
                    onClick={() => signOut()}
                  >
                    <LogOutIcon className='h-4 w-4' />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </>
            ) : (
              <>
                <DropdownMenuContent
                  align='end'
                  className='rounded-md bg-white p-2 shadow-lg'
                >
                  <a href='/login'>
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </a>
                </DropdownMenuContent>
              </>
            )}
          </DropdownMenu>
        </div>
        {/* Mobile Menu */}
        <div className='flex items-center md:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Menu className='h-6 w-6 text-gray-700' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='rounded-md bg-white p-2 shadow-lg'
            >
              <DropdownMenuItem>
                <a href='#home'>Home</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href='#catalog'>Catalog</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href='#company'>Company</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href='#contact'>Contact Us</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
      {/* {helpOpen && <PopOver />} */}
    </div>
  )
}
const landings = [
  { id: nanoid(), title: 'project-management', route: '#' },
  { id: nanoid(), title: 'crm-landing', route: '#' },
  { id: nanoid(), title: 'FAQS-landing', route: '#' }
]
export default Navbar
