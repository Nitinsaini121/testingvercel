'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const columns = (handleDeleteCatalog, handleEditCatalog) => [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => row.id
  },
  {
    accessorKey: 'productName',
    header: 'Product Name',
    accessorFn: row => row.productName
  },

  {
    accessorKey: 'grade',
    header: 'Grade',
    accessorFn: row => row.grade
  },

  {
    accessorKey: 'type',
    header: 'Type',
    accessorFn: row => row.type
  },

  {
    accessorKey: 'features',
    header: 'Features',
    accessorFn: row => row.features
  },
  {
    accessorKey: 'Specifications Description',
    header: 'Specifications Description',
    cell: ({ row }) => {
      const description = row.original.specificationsDescription
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
            <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
              {description}
            </TooltipContent>
          )}
        </Tooltip>
      )
    }
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
                  onClick={() => handleDeleteCatalog(row)}
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
                  onClick={() => handleEditCatalog(row)}
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
