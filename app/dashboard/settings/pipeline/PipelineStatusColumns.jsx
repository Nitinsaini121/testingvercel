'use client'

import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'

export const PipelineStatusColumns = (handleDeleteLeads, handleEditLeads) => [
  {
    header: 'Id',
    cell: ({ row }) => `#0${row.index + 1}`
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    accessorKey: 'materialType',
    header: 'Material Type',
    cell: ({ row }) => row.original.materialType
  },
  {
    header: 'Status',
    cell: ({ row }) => {
      const statuses = row.original.statusGroup?.status || []
      return (
        <div className='flex gap-2'>
          {statuses.map(s => (
            <span
              key={s.id}
              className='rounded-xl bg-blue-200 px-4 text-blue-500'
            >
              {s.status}
            </span>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='grid'>
          <div className='flex space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              className='text-green-600 hover:bg-green-50'
              onClick={() => handleEditLeads(row)}
            >
              <Edit className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-red-600 hover:bg-red-50'
              onClick={() => handleDeleteLeads(row)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )
    }
  }
]
