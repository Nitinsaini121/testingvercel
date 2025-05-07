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
import {
  Contact,
  Factory,
  FileText,
  HomeIcon,
  LayoutGrid,
  Settings,
  UsersIcon
} from 'lucide-react'
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
          url: '/dashboard/users/list'
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
          url: '/dashboard/leads/list'
        },
        {
          title: 'Add Lead',
          url: '/dashboard/leads/add'
        }
      ]
    },
    {
      title: 'Projects',
      url: '/dashboard/project',
      icon: DocumentTextIcon,
      isActive: true,
      items: [
        {
          title: 'All Projects',
          url: '/dashboard/project/list'
        },
        {
          title: 'Add Projects',
          url: '/dashboard/project/add'
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
          url: '/dashboard/workorders/list'
        },
        {
          title: 'Add Work Orders',
          url: '/dashboard/workorders/add'
        }
      ]
    },
    {
      title: 'Settings',
      url: '/dashboard/setting',
      icon: Settings,
      isActive: true,
      items: [
        {
          title: 'All Sub Contractor Region',
          url: '/dashboard/setting/manage-contractor-region'
        },
        {
          title: 'All Work Order Categories',
          url: '/dashboard/setting/work-order-categories'
        }
      ]
    },
    {
      title: 'Products',
      url: '/dashboard/product',
      icon: LayoutGrid,
      isActive: true,
      items: [
        {
          title: 'Add Product',
          url: '/dashboard/product/add'
        },
        {
          title: 'All Products',
          url: '/dashboard/product/list'
        },
        {
          title: 'Material Quotes',
          url: '/dashboard/product/material-quotes'
        },
        {
          title: 'Attributes',
          url: '/dashboard/product/attribute'
        },
        {
          title: 'Category',
          url: '/dashboard/product/product-categories'
        },
        {
          title: 'Inventory',
          url: '/dashboard/product/inventory'
        }
      ]
    },
    {
      title: 'Manufacturer',
      url: '/dashboard/manufacturer',
      icon: Factory,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent className='theme-bg'>
        <div className='flex items-center gap-3 px-2 justify-center main-logo'>
          <Link href='/dashboard' className='flex-shrink-0'><img src='/images/fortress-logo.png' className='w-full' />{' '}</Link>
          {/* <p className={cn(
              'font-semibold transition-all',
              state === 'collapsed'
                ? 'w-0 overflow-hidden opacity-0'
                : 'w-auto opacity-100'
            )}
          >
          </p> */}
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
