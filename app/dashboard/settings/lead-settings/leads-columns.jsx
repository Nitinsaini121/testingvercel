'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const LeadSettingsColumns = (handleDeleteLeads, handleEditLeads) => [
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='grid grid-cols-3'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <EllipsisVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handleEditLeads(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteLeads(row)}
                className='cursor-pointer text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.original.title
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      const color = row?.original?.color || '#ffffff'
      console.log('color', color)
      const backgroundColor = `${color}20`
      return (
        <div
          className='inline-block rounded border px-3 py-1 text-sm font-medium'
          style={{
            backgroundColor: backgroundColor,
            color: color
          }}
        >
          {color}
        </div>
      )
    }
  }
]
