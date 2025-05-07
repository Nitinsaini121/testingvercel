'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const taskColumn = (handleDeleteTask, handleEditTask) => [
  {
    accessorKey: 'action',
    header: 'Action',
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
                onClick={() => handleEditTask(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteTask(row)}
                className='cursor-pointer text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant='ghost'
            size='icon'
            className='text-green-600 hover:bg-green-300'
            onClick={() => handleEditTask(row)}
          >
            <Edit className='h-5 w-5' />
          </Button>
        </>
      )
    }
  },

  {
    id: 'taskGroup',
    header: 'Task Group',
    cell: ({ row }) => row.original.taskGroup?.name
  },
  {
    accessorKey: 'taskStatus',
    header: 'Task Status',
    cell: ({ row }) => row.original?.taskStatus?.title
  },
  {
    accessorKey: 'taskSubject',
    header: 'Task Subject',
    cell: ({ row }) => row.original.taskSubject?.name
  },
  {
    accessorKey: 'project',
    header: 'Project',
    cell: ({ row }) => row.original?.project?.name
  },

  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => row.original?.company?.name
  },

  {
    accessorKey: 'user',
    header: 'Assigned User',
    cell: ({ row }) => row.original?.taskUsers?.map(item => item?.user?.name)
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => new Date(row.original?.updated_at).toLocaleDateString()
  },
  {
    accessorKey: 'taskTag',
    header: 'Task Tag',
    cell: ({ row }) => row.original?.taskTags?.map(item => item.tag?.title)
  },
  {
    accessorKey: 'taskUrgency',
    header: 'Task Urgency',
    cell: ({ row }) => row.original?.taskUrgency?.name
  }
]
