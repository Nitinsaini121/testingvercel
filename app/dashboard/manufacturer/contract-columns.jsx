'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const columns = (handleDeleteManufacturer, handleEditManufacturer) => [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => row.id
  },
  {
    accessorKey: 'status',
    header: 'Status',
    accessorFn: row => row.status
  },
  {
    accessorKey: 'title',
    header: 'Title',
    accessorFn: row => row.title
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    accessorFn: row => row.slug
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt='Manufacturer'
        style={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 4 }}
      />
    )
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-red-600 hover:bg-red-300'
                  onClick={() => handleDeleteManufacturer(row)}
                >
                  <Trash2 className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                Delete
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-green-600 hover:bg-green-300'
                  onClick={() => handleEditManufacturer(row)}
                >
                  <Edit className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                Edit
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )
    }
  }
]
