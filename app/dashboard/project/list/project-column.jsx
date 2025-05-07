'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Eye, Trash2 } from 'lucide-react'

export const columnsProject = (
  handleEditProject,
  handleDeleteProject,
  router
) => [
  {
    id: 'id',
    header: 'Id',
    cell: ({ row }) => row.original.id
  },
  {
    accessorKey: 'projectName',
    header: 'Poject Name',
    cell: ({ row }) => row.original.projectName
  },

  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const address = row?.original?.address
      const truncated = address
        ? address.split(' ').slice(0, 5).join(' ') +
          (address.split(' ').length > 5 ? '...' : '')
        : ''

      return (
        <Tooltip>
          <TooltipTrigger className='cursor-pointer truncate'>
            {truncated}
          </TooltipTrigger>
          {address && (
            <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
              {address}
            </TooltipContent>
          )}
        </Tooltip>
      )
    }
  },
  {
    accessorKey: 'location',
    header: 'Project Location',
    cell: ({ row }) => {
      const lat = row.original.latitude // Ensure correct key
      const lng = row.original.longitude // Ensure correct key

      if (!lat || !lng) return <span>No Location</span>

      return (
        <a
          className='site-button-small'
          href={`https://www.google.com/maps?q=${lat},${lng}`}
          target='_blank'
          rel='noopener noreferrer'
          style={{ textDecoration: 'underline' }}
        >
          View on Map
        </a>
      )
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => row.original.price
  },
  {
    accessorKey: 'scope',
    header: 'Scope',
    cell: ({ row }) => row.original.scope
  },

  {
    accessorKey: 'description',
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
                  onClick={() => handleDeleteProject(row)}
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
                  onClick={() => handleEditProject(row)}
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
