'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Eye } from 'lucide-react'

export const CoverColumn = handlePreviewLeads => [
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            type='button'
            size='icon'
            className='text-gray-600 hover:bg-gray-300'
            onClick={() => handlePreviewLeads(row)}
          >
            <Eye className='h-5 w-5' />
          </Button>
        </TooltipTrigger>
        <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
          Preview
        </TooltipContent>
      </Tooltip>
    )
  },
  {
    header: 'Rev Id',
    cell: ({ row }) => `#0${row.index + 1}`
  },
  {
    accessorKey: 'projectName',
    header: 'Revision/Plan Status',
    cell: ({ row }) => `${row.original.projectName}`
  },
  {
    accessorKey: 'quote_date',
    header: 'Quote Date',
    cell: ({ row }) => {
      const date = new Date(row.original.quote_date)
      return date.toISOString().split('T')[0] // "YYYY-MM-DD"
    }
  },
  {
    accessorKey: 'plan_date',
    header: 'Plan Date',
    cell: ({ row }) => {
      const date = new Date(row.original.plan_date)
      return date.toISOString().split('T')[0]
    }
  },
  {
    accessorKey: 'plan_note',
    header: 'Plan Notes',
    cell: ({ row }) => row.original.plan_note
  },

  {
    accessorKey: 'updated_at',
    header: 'Last Updated Date',
    cell: ({ row }) => {
      const date = new Date(row.original.updated_at)
      return date.toISOString().split('T')[0] // "YYYY-MM-DD"
    }
  }
]
