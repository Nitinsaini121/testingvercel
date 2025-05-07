import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const columns = (handleDeleteUser, handleEditUser) => [
  {
    accessorKey: 'id',
    header: 'Id',
    accessorFn: row => row.id
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    accessorFn: row => row.firstName
  },
  {
    accessorKey: 'userName',
    header: 'User Name',
    accessorFn: row => row.userName
  },
  {
    accessorKey: 'email',
    header: 'Email',
    accessorFn: row => row.email
  },
  {
    accessorKey: 'role',
    header: 'User Role',
    accessorFn: row => row.role
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
    accessorFn: row => {
      if (!row.createdAt) return ''
      const date = new Date(row.createdAt)
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
          </TooltipProvider>
        </>
      )
    }
  }
]
