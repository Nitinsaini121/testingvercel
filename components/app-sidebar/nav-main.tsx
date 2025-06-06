'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavMainProps {
  homeItem: {
    title: string
    url: string
    icon: LucideIcon
  }
  items: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }[]
}

export default function NavMain({ homeItem, items }: NavMainProps) {
  const pathname = usePathname()
  const isActiveUrl = (url: string) => {
    if (url === '/dashboard') return pathname === url // Exact match for Home
    return pathname.startsWith(url) // Parent & child pages stay active
  }

  const isParentActive = (title: string, url: string) =>
    openSection === title || pathname.startsWith(url)

  // State for open section - initially null to prevent hydration issues
  const [openSection, setOpenSection] = useState<string | null>(null)
  useEffect(() => {
    // Load from localStorage after the component mounts (client-side)
    const storedSection = localStorage.getItem('openSection')
    if (storedSection) setOpenSection(storedSection)
  }, [])

  // Function to ensure only one section stays open
  const toggleSection = (title: string) => {
    setOpenSection(prev => {
      const newState = prev === title ? null : title
      localStorage.setItem('openSection', newState || '')
      return newState
    })
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {/* Home Link */}
        <SidebarMenuItem className='m-1 rounded'>
          <SidebarMenuButton
            asChild
            tooltip={homeItem.title}
            className={cn(
              'main-menu-item theme-text-color !rounded px-1 py-5 font-normal active:bg-sidebar-primary/5 active:text-sidebar-primary',
              isActiveUrl(homeItem.url) && ''
            )}
          >
            <Link href={homeItem.url}>
              <span
                className={cn(
                  'menu-icon flex !h-7 !w-7 items-center justify-center rounded p-1',
                  isActiveUrl(homeItem.url) && 'theme-text-color'
                )}
              >
                {homeItem.icon && <homeItem.icon />}
              </span>
              <span>{homeItem.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Sidebar Sections */}
        {items.map(item => {
          const isOpen = openSection === item.title
          const isActive = item.url && isParentActive(item.title, item.url)

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              className='group/collapsible'
            >
              <SidebarMenuItem className='m-1 rounded'>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={cn(
                      'theme-text-color main-menu-item !rounded px-1 py-5 font-normal',
                      isActive && 'font-normal'
                    )}
                    tooltip={item.title}
                    onClick={() => toggleSection(item.title)}
                  >
                    <span
                      className={cn(
                        'menu-icon flex !h-7 !w-7 items-center justify-center rounded p-1',
                        isActive && 'text-white'
                      )}
                    >
                      {item.icon && <item.icon />}
                    </span>

                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        'ml-auto transition-transform duration-200',
                        isOpen && 'rotate-90'
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className='sub-menu-item px-2 py-2'>
                    {item.items?.map(subItem => (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className='relative py-1'
                      >
                        <SidebarMenuSubButton
                          asChild
                          className={cn(
                            'theme-text-color !rounded font-normal hover:text-sidebar-primary active:text-sidebar-primary',
                            isActiveUrl(subItem.url) &&
                              'font-normal text-sidebar-primary'
                          )}
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
