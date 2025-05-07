'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, EllipsisVertical, Eye, FileText, Trash2 } from 'lucide-react'
export const columnsBudget = (
  handleDeleteBudget,
  handleEditBudget,
  handleCoverBudget,
  handleQuotesBudget,
  handleVePrintBudget
) => [
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <EllipsisVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handleEditBudget(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteBudget(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleQuotesBudget(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Eye className='mr-2 h-4 w-4' />
                Quote
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCoverBudget(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <FileText className='mr-2 h-4 w-4' />
                Cover
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleVePrintBudget(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <FileText className='mr-2 h-4 w-4' />
                Ve Print
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }
  },
  {
    id: 'projectName',
    header: 'Project Name',
    cell: ({ row }) => row.original.budgetBook?.name
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => row.original.address
  },
  {
    accessorKey: 'quote_date',
    header: 'Quote Date',
    cell: ({ row }) => row.original.quote_date
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => row.original.total
  },



  {
    accessorKey: 'plan_status',
    header: 'Plan Status',
    cell: ({ row }) => {
      const address = row.original.plan_status
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
            <TooltipContent className='rounded-sm bg-gray-600 text-sm w-96'>
              {address}
            </TooltipContent>
          )}
        </Tooltip>
      )
    }
  }
]
