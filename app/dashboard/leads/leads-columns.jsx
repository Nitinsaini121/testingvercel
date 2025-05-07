'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { format, parseISO } from 'date-fns'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'

export const LeadsColumns = (
  handleDeleteLeads,
  handleEditLeads,
  handlePreviewLeads,
  DCSOpenModal
) => [
  {
    accessorKey: 'action',
    header: 'Action',
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
              <DropdownMenuItem
                onClick={() => handlePreviewLeads(row)}
                className='cursor-pointer text-blue-600'
              >
                <Eye className='mr-2 h-4 w-4' />
                Preview
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button
            variant='ghost'
            size='icon'
            className='text-green-600 hover:bg-green-300'
            onClick={() => handleEditLeads(row)}
          >
            <Edit className='h-5 w-5' />
          </Button> */}
          <Button
            variant='ghost'
            size='icon'
            className='text-gray-600 hover:bg-gray-300'
            onClick={() => handlePreviewLeads(row)}
          >
            <Eye className='h-5 w-5' />
          </Button>
        </div>
      )
    }
  },

  {
    accessorKey: 'leadStatus',
    header: 'Lead Status',
    cell: ({ row }) => {
      const status = row.original.leadStatus?.title

      const colorMap = {
        'In Progress': 'bg-green-300 text-green-600',
        ASSIGNED: 'bg-orange-100 text-orange-600',
        COMPLETE: 'bg-teal-100 text-teal-600',
        HOLD: 'bg-red-100 text-red-600',
        Hot: 'bg-red-100 text-red-600',
        'FINALIZE BID': 'bg-blue-300 text-blue-500',
        Assigned: 'bg-orange-200 text-orange-500',
        PENDING: 'bg-lime-100 text-lime-600'
      }

      return status ? (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${colorMap[status] || 'bg-gray-100 text-gray-600'}`}
        >
          {status}
        </span>
      ) : (
        '-'
      )
    }
  },

  {
    accessorKey: 'project_id',
    header: 'Project',
    cell: ({ row }) => row.original.project?.name
  },
  {
    accessorKey: 'company_id',
    header: 'Company',
    cell: ({ row }) => row?.original?.company?.name
  },
  {
    accessorKey: 'contact_id',
    header: 'Contact',
    cell: ({ row }) => row.original.contact?.name
  },
  {
    accessorKey: 'engineer_id',
    header: 'Engineer',
    cell: ({ row }) => {
      return row.original.engineer?.name
    }
  },
  {
    accessorKey: 'recieved',
    header: 'Received',
    cell: ({ row }) => {
      const date = row.original.date_record
      return date ? format(parseISO(date), 'dd-MM-yyyy') : '-'
    }
  },
  {
    accessorKey: 'to_due_date',
    header: 'Due Date',
    cell: ({ row }) => {
      const date = row.original.due_date
      return date ? format(parseISO(date), 'dd-MM-yyyy') : '-'
    }
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.original.leadTags || []

      const tagColorMap = {
        Assigned: 'bg-orange-100 text-orange-600',
        'On Hold': 'bg-yellow-100 text-yellow-600',
        Hot: 'bg-red-100 text-red-600',
        COMPLETE: 'bg-green-100 text-green-600',
        Tag1: 'bg-lime-100 ',
        'tag 1': 'bg-lime-100 text-lime-600',
        'task tag 2': 'bg-green-300 text-green-600'
      }

      return (
        <div className='flex flex-wrap gap-2 max-w-64'>
          {tags.map((tagObj, index) => {
            const title = tagObj?.tag?.title || ''
            const customClass =
              tagColorMap[title] || 'bg-gray-100 text-gray-600'

            return (
              <span
                key={index}
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${customClass}`}
              >
                {title}
              </span>
            )
          })}
        </div>
      )
    }
  },
  {
    accessorKey: 'interaction',
    header: 'Interactions',
    cell: ({ row }) => row.original.interaction
  },
  {
    accessorKey: 'dcs',
    header: 'DCS',
    cell: ({ row }) => {
      const rawDcsString = row.original.dcs || '0%'
      const cleanedDcs = parseFloat(rawDcsString.replace('%', '')) || 0

      return (
        <button onClick={() => DCSOpenModal(row)}>
          <div className='relative h-4 w-24 overflow-hidden rounded-full bg-green-50'>
            <div
              className='h-full rounded-full bg-green-500'
              style={{ width: `${cleanedDcs}%` }}
            />
            <span className='absolute inset-0 flex items-center justify-center text-xs font-medium text-green-800'>
              {cleanedDcs}%
            </span>
          </div>
        </button>
      )
    }
  }
]
