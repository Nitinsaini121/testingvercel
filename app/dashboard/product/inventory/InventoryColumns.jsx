'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const columnsInventory =(handleDeleteInventory,handleEditInventory)=> [
  {
    id: 'id',
    header: 'Id',
    cell: ({ row }) => row.original.id
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => row.original.sku
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: ({ row }) => row.original.brand
  },
  {
    accessorKey: 'shortDescription',
    header: 'Short Description',
    cell: ({ row }) => {
      const words = row.original?.shortDescription?.split(' ')
      const truncatedText =
        words?.slice(0, 5).join(' ') + (words?.length > 8 ? '...' : '')

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='cursor-pointer'>
              {truncatedText}
            </TooltipTrigger>
            <TooltipContent className='max-w-96 text-sm text-center text-dark-color rounded-md'>
              {row.original.shortDescription}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    id: 'units',
    header: 'Units',
    cell: ({ row }) => {
      let units = row?.original?.units

      if (typeof units === 'string') {
        try {
          units = JSON.parse(units) // Convert JSON string to an array
        } catch (error) {
          console.error('Invalid JSON format for units:', units)
          units = [] // Default to empty array if parsing fails
        }
      }

      return Array.isArray(units) && units.length > 0 ? (
        units.map((unit, index) => (
          <div key={index}>
            <strong>Qty:</strong> {unit.quantity}, <strong>UOM:</strong>{' '}
            {unit.unitOfMeasure}
          </div>
        ))
      ) : (
        <span>-</span> // Display a dash if no units exist
      )
    }
  },
  {
    id: 'vendor',
    header: 'Vendor',
    cell: ({ row }) => {
      let vendors = row?.original?.vendor

      if (typeof vendors === 'string') {
        try {
          vendors = JSON.parse(vendors) // Convert JSON string to an array
        } catch (error) {
          console.error('Invalid JSON format for vendors:', vendors)
          vendors = [] // Default to empty array if parsing fails
        }
      }

      return Array.isArray(vendors) && vendors.length > 0 ? (
        vendors.map((vendor, index) => (
          <div key={index}>
            <strong>Vendor:</strong> {vendor.vendor}, <strong>Cost:</strong>{' '}
            {vendor.vendorCost}, <strong>UOM:</strong> {vendor.vendorUOM}
          </div>
        ))
      ) : (
        <span>-</span> // Display a dash if no vendor data exists
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
                  onClick={() => handleDeleteInventory(row)}
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
                  onClick={() => handleEditInventory(row)}
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
