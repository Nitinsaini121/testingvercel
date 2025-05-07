'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const columnsMaterial = (
  handleEditMaterialQuotes,
  handleDeleteMaterialQuotes,
  router
) => [
  {
    id: 'id',
    header: 'Id',
    cell: ({ row }) => row.original.id
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
    cell: ({ row }) => row.original.customerName
  },

  {
    accessorKey: 'shipTo',
    header: 'Ship To',
    cell: ({ row }) => {
      const shipTo = row?.original?.shipTo
      const truncated = shipTo
        ? shipTo.split(' ').slice(0, 5).join(' ') +
          (shipTo.split(' ').length > 5 ? '...' : '')
        : ''

      return (
        <Tooltip>
          <TooltipTrigger className='cursor-pointer truncate'>
            {truncated}
          </TooltipTrigger>
          {shipTo && (
            <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
              {shipTo}
            </TooltipContent>
          )}
        </Tooltip>
      )
    }
  },
  {
    accessorKey: 'materialTotal',
    header: 'Material Total',
    cell: ({ row }) => row.original.materialTotal
  },
  {
    accessorKey: 'grandTotal',
    header: 'Total',
    cell: ({ row }) => row.original.grandTotal
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status || 'Not Sent'
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
                  onClick={() => handleDeleteMaterialQuotes(row)}
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
                  onClick={() => handleEditMaterialQuotes(row)}
                >
                  <Edit className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                Edit
              </TooltipContent>
            </Tooltip>
            {/* <Tooltip> */}
              {/* <TooltipTrigger asChild> */}
                <Button
                  variant='ghost'
                  size='icon'
                  className='site-button-small'
                  onClick={() =>
                    router.push(
                      `/dashboard/product/material-quotes/viewmaterialquote?id=${row.original.id}`
                    )
                  }
                >
                  View
                </Button>
              {/* </TooltipTrigger> */}
              {/* <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                View
              </TooltipContent> */}
            {/* </Tooltip> */}
          </TooltipProvider>
        </>
      )
    }
  }
]
