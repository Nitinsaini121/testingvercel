'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Eye, Trash2 } from 'lucide-react'
export const columns = (handleDeleteUser, handleEditUser, router) => [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => row.id
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    accessorFn: row => row.firstName
  },
  {
    accessorKey: 'phone',
    header: 'Phone No',
    accessorFn: row => row.phone
  },
  {
    accessorKey: 'state',
    header: 'State',
    accessorFn: row => row.state
  },
  {
    accessorKey: 'date',
    header: 'Date',
    accessorFn: row => {
      if (!row.date) return '' // Handle null/undefined values
      const date = new Date(row.date)
      return isNaN(date.getTime())
        ? ''
        : date
            .toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
            .replace(',', '')
    }
  },

  // {
  //   accessorKey: 'leadAge',
  //   header: 'Lead Age',
  //   accessorFn: row => row.leadAge
  // },
  {
    accessorKey: 'leadLocation',
    header: 'Lead Location',
    cell: ({ row }) => {
      const lat = row.original.lattitude // Ensure correct key
      const lng = row.original.longitude // Ensure correct key
      if (!lat || !lng) return <span>No Location</span>

      return (
        <>
          <div>
            <a
              className='site-button-small'
              href={`https://www.google.com/maps?q=${lat},${lng}`}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'underline' }}
            >
              View on Map
            </a>
          </div>
        </>
      )
    }
  },

  {
    accessorKey: 'customerLocation',
    header: 'Customer Location',
    cell: ({ row }) => {
      const customerlat = row.original.customerLatitude
      const customerlong = row.original.customerLongitude
      return (
        <>
          {customerlat && customerlong ? (
            <>
              <div>
                <a
                  className='site-button-small'
                  href={`https://www.google.com/maps?q=${customerlat},${customerlong}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ textDecoration: 'underline' }}
                >
                  View on Map
                </a>
              </div>
            </>
          ) : (
            <>
              <div>
                <p>Same as Lead Location</p>
              </div>
            </>
          )}
        </>
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
                  onClick={() => handleDeleteUser(row)}
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
                  onClick={() => handleEditUser(row)}
                >
                  <Edit className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                Edit
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-gray-600 hover:bg-gray-300'
                  onClick={() =>
                    router.push(
                      `/dashboard/leads/list/viewpage?id=${row.original.id}`
                    )
                  }
                >
                  <Eye className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                View
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )
    }
  }
]
