'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { HomeIcon, User } from 'lucide-react'
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
      title: 'CRM',
      url: '/dashboard/CRM',
      icon: DocumentTextIcon,
      isActive: true,
      items: [
        {
          title: 'Contacts',
          url: '/dashboard/contact'
        }
        // {
        //   title: 'Contracts',
        //   url: '/dashboard/contract'
        // }
      ]
    },
    {
      title: 'Leads',
      url: '/dashboard/leads',
      icon: DocumentTextIcon,
      isActive: true,
      items: [
        {
          title: 'Leads',
          url: '/dashboard/leads'
        },
        {
          title: 'Budget Book',
          url: '/dashboard/budget-book'
        }
      ]
    },
    {
      title: 'Quotes',
      url: '/dashboard/materialquotes/list',
      icon: DocumentTextIcon,
      isActive: true,
      items: [
        {
          title: 'Material Quotes',
          url: '/dashboard/quotes/materialquotes/list'
        },
        {
          title: 'Material',
          url: '/dashboard/quotes/material/list'
        }
      ]
    },
    {
      title: 'Sales Pipeline  ',
      url: '/dashboard/sales-pipeline',
      icon: DocumentTextIcon,
      isActive: true,
      items: [
        {
          title: 'Sales Pipeline',
          url: '/dashboard/sales-pipeline'
        }
      ]
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: User,
      isActive: true,
      items: [
        {
          title: 'Lead Settings',
          url: '/dashboard/settings',
          items: [
            {
              title: 'Leads Status',
              url: '/dashboard/settings/lead-settings/leads-status'
            },
            {
              title: 'Leads Type',
              url: '/dashboard/settings/lead-settings/leads-type'
            },
            {
              title: 'Leads Tags',
              url: '/dashboard/settings/lead-settings/leads-tag'
            },
            {
              title: 'Interaction Type',
              url: '/dashboard/settings/lead-settings/interaction-type'
            }
          ]
        },
        {
          title: 'Task Settings',
          url: '/dashboard/settings',
          items: [
            {
              title: 'Task Tags',
              url: '/dashboard/settings/task-setting/task-tag'
            },
            {
              title: 'Task Group',
              url: '/dashboard/settings/task-setting/task-group'
            },
            {
              title: 'Task Subject',
              url: '/dashboard/settings/task-setting/task-subject'
            },
            {
              title: 'Task Urgencies',
              url: '/dashboard/settings/task-setting/task-urgency'
            }
          ]
        },
        {
          title: 'User Settings',
          url: '/dashboard/settings',
          items: [
            {
              title: 'User List',
              url: '/dashboard/settings/user-setting/list'
            },
            {
              title: 'Role ',
              url: '/dashboard/settings/user-setting/rolelist'
            }
          ]
        },
        {
          title: 'Budget Book Scope',
          url: '/dashboard/settings/budget-book-setting/scopelist'
        },
        {
          title: 'Pipeline',
          url: '/dashboard/settings/pipeline'
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
        <div className='main-logo flex h-20 items-center justify-center gap-3 border-b bg-white px-2'>
          <Link href='/dashboard' className='flex-shrink-0'>
            <img src='/images/logo-b50fe6ce.jpeg' className='w-56' />{' '}
          </Link>
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
