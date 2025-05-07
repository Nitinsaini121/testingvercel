'use client'

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Edit, Trash2 } from "lucide-react"

export const columns =(handleEditRegion,handleDeleteRegion)=> [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => row.id
  },

  {
    accessorKey: 'regionName',
    header: 'Contractor Region Name',
    accessorFn: row => row.regionName
  },
  {
    accessorKey: 'associateZipCode',
    header: 'Associate Region Zip Code',
    accessorFn: row => row.associateZipCode
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
                    onClick={() => handleDeleteRegion(row)}
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
                    onClick={() => handleEditRegion(row)}
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
