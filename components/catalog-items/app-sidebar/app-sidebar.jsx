'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'

import { cn } from '@/lib/utils'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { Contact, FileText, HomeIcon, Settings, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import NavMain from './nav-main'
import { NavUser } from './nav-user'

const data = {
  home: {
    title: 'Home',
    url: '/dashboard',
    icon: HomeIcon,
    isActive: true
  },
  navMain: [
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: UsersIcon,
      isActive: true,
      items: [
        {
          title: 'All Users',
          url: '/dashboard/users'
        },
        {
          title: 'Add User',
          url: '/dashboard/users/add'
        }
      ]
    },
    {
      title: 'Leads',
      url: '/dashboard/leads',
      icon: DocumentTextIcon,
      isActive: true,
      items: [
        {
          title: 'All Leads',
          url: '/dashboard/leads'
        },
        {
          title: 'Add Lead',
          url: '/dashboard/leads/add'
        }
      ]
    },
    {
      title: 'Contractor',
      url: '/dashboard/contract',
      icon: Contact,
      isActive: true,
      items: [
        {
          title: 'All Sub Contractor Leads',
          url: '/dashboard/contract/list'
        },
        {
          title: 'All Qualified Contractors',
          url: '/dashboard/contract/qualified-contractor'
        },
        {
          title: 'Add Sub Contractor',
          url: '/dashboard/contract/add'
        }
      ]
    },

    {
      title: 'Work Orders',
      url: '/dashboard/workorders',
      icon: FileText,
      isActive: true,
      items: [
        {
          title: 'All Work Orders',
          url: '/dashboard/workorders'
        },
        {
          title: 'Add Work Orders',
          url: '/dashboard/workorders/add'
        }
      ]
    },
    {
      title: 'Settings',
      url: '',
      icon: Settings,
      isActive: true,
      items: [
        // {
        //   title: 'Add Contractor Region',
        //   url: '/dashboard/setting/manage-contractor-region/addregion'
        // },
        {
          title: 'All Sub Contractor Region',
          url: '/dashboard/setting/manage-contractor-region'
        },
        {
          title: 'All Work Order Categories',
          url: '/dashboard/setting/work-order-catogries'
        }
        // {
        //   title: 'Add Work Order Catogries',
        //   url: '/dashboard/setting/work-order-catogries/add'
        // },
      ]
    },
    {
      title: 'Catelog',
      url: '',
      icon: Settings,
      isActive: true,
      items: [
        {
          title: 'Add Catelog',
          url: '/dashboard/catalog/add'
        },
        {
          title: 'All Catelogs',
          url: '/dashboard/catalog/list'
        }
      ]
    },
    {
      title: 'Manufacturer',
      url: '',
      icon: Settings,
      isActive: true,
      items: [
        {
          title: 'Add Manufacturer',
          url: '/dashboard/manufacturer/add'
        },
        {
          title: 'All Manufacturers',
          url: '/dashboard/manufacturer/list'
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }) {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        <div className='mt-4 flex items-center gap-3 px-2'>
          <Link href='/dashboard' className='flex-shrink-0'>
          </Link>
          <p
            className={cn(
              'font-semibold transition-all',
              state === 'collapsed'
                ? 'w-0 overflow-hidden opacity-0'
                : 'w-auto opacity-100'
            )}
          >
            <img src='/images/logo-orange.png' className='w-48' />{' '}
          </p>
        </div>
        <NavMain homeItem={data.home} items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
