'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const columns =(handleEditProductCatogries,handleDeleteCatogrie)=> [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => row.id
  },
  {
    accessorKey: 'name',
    header: 'Name',
    accessorFn: row => row?.name
  },

  {
    accessorKey: 'slug',
    header: 'Slug',
    accessorFn: row => row?.slug
  },

  {
    accessorKey: 'image',
    header: ' Image',
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt='Product Catogrie Image'
        width={50}
        height={50}
      />
    )
  },

  {
    accessorKey: 'parentCategory',
    header: 'Parent Category',
    accessorFn: row => row.parentCategory
  },
  {
    accessorKey: 'Description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row?.original?.description
      const truncated = description
        ? description.split(' ').slice(0, 5).join(' ') +
          (description.split(' ').length > 5 ? '...' : '')
        : ''

      return (
        <Tooltip>
          <TooltipTrigger className='cursor-pointer truncate'>
            {truncated}
          </TooltipTrigger>
          {description && (
            <TooltipContent className='rounded-sm bg-gray-600 text-sm'>{description}</TooltipContent>
          )}
        </Tooltip>
      )
    }
  }, {
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
                  onClick={() => handleDeleteCatogrie(row)}
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
                  onClick={() => handleEditProductCatogries(row)}
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
