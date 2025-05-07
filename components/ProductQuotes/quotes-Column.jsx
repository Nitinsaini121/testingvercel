'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Trash2 } from 'lucide-react'

export const columns = (handleDeleteQuotes, handleEditQuotes) => [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => row.id
  },

  {
    accessorKey: 'customerName',
    header: 'Customer Name',
    accessorFn: row => row.customerName
  },
  {
    accessorKey: 'customerPhone',
    header: 'Customer Phone',
    accessorFn: row => row.customerPhone
  },
  {
    accessorKey: 'materialQuality',
    header: 'Material Quality',
    cell: ({ row }) => {
      const value = row.getValue('materialQuality')
      const labelMap = {
        goodProduct: 'Good',
        betterProduct: 'Better',
        bestProduct: 'Best'
      }

      return labelMap[value] || '-'
    }
  },

  {
    accessorKey: 'total',
    header: 'Total',
    accessorFn: row => row.total
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
                  onClick={() => handleDeleteQuotes(row)}
                >
                  <Trash2 className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                Delete
              </TooltipContent>
            </Tooltip>

            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-green-600 hover:bg-green-300'
                  onClick={() => handleEditQuotes(row)}
                >
                  <Edit className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                Edit
              </TooltipContent>
            </Tooltip> */}
          </TooltipProvider>
        </>
      )
    }
  }
]
