'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => '#SC-' + row.id
  },
  {
    accessorKey: 'status',
    header: 'Status',
    accessorFn: row => row.status
  },
  {
    accessorKey: 'contractorName',
    header: 'Contractor Info',
    cell: ({ row }) => {
      const name = row.original?.contractorName || '-'
      const email = row.original?.contractorEmail || '-'

      return (
        <div>
          <div className='font-medium'>{name}</div>
          <div className='text-sm text-gray-500'>{email}</div>
        </div>
      )
    }
  },
  {
    accessorKey: 'fullAddress',
    header: 'Address',
    cell: ({ row }) => {
      const { contractorAddress, contractorCity, contractorState } =
        row.original
      const fullAddress =
        `${contractorAddress || ''}, ${contractorCity || ''}, ${contractorState || ''}`
          .replace(/^, |, ,|,$/g, '')
          .trim()

      const words = fullAddress.split(' ')
      const shortAddress =
        words.length > 7 ? words.slice(0, 5).join(' ') + '...' : fullAddress

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='cursor-pointer'>
              {shortAddress}
            </TooltipTrigger>
            <TooltipContent className='w-96 rounded-sm bg-gray-600 text-sm'>
              {fullAddress}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    accessorKey: 'contractorRegion',
    header: 'Region',
    accessorFn: row => row.contractorRegion
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
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
    accessorKey: 'lastInteractionDate',
    header: 'Last Interaction',
    accessorFn: row => row.interactions[0]?.date || '-'
  },
  {
    accessorKey: 'conversionChance',
    header: 'Conversion Chance',
    cell: ({ row }) => {
      const value = row.original?.leadScore || 0

      const getColor = value => {
        if (value >= 75) return '#22c55e' // Green for high score
        if (value >= 50) return '#facc15' // Yellow for medium score
        return '#ef4444' // Red for low score
      }

      return (
        <div className='relative h-12 w-12'>
          <div className='absolute inset-0 rounded-full border-2 border-gray-200'></div>
          <svg
            className='absolute inset-0 h-full w-full -rotate-90 transform'
            viewBox='0 0 36 36'
          >
            <circle
              cx='18'
              cy='18'
              r='16'
              fill='transparent'
              stroke={getColor(value)}
              strokeWidth='3'
              strokeDasharray='100'
              strokeDashoffset={100 - value}
              strokeLinecap='round'
            />
          </svg>
          {/* Percentage Value */}
          <div className='absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700'>
            {value}%
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'noOfInteractions',
    header: 'No. Of Interactions',
    accessorFn: row => row.interactions[0]?.totalInteractions || '-'
  },
  {
    accessorKey: 'lastCommunication',
    header: () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='cursor-pointer'>
            Last Communication
          </TooltipTrigger>
          <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
            Most recent interaction notes
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    cell: ({ row }) => {
      const lastInteraction = row.original?.interactions?.[0]
      const content = lastInteraction?.notes || '-'

      const preview =
        content.split(' ').slice(0, 5).join(' ') +
        (content.split(' ').length > 5 ? '...' : '')

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className=''>{preview}</TooltipTrigger>
            <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
              {content}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },

  {
    accessorKey: 'followUpDetails',
    header: 'Follow Up Date/Type',
    cell: ({ row }) => {
      const followUpDate = '15/03/2025'
      const followUpType = 'Call'

      return (
        <div>
          <div className='font-medium'>{followUpDate}</div>
          <div className='text-sm text-gray-500'>{followUpType}</div>
        </div>
      )
    }
  }
]
