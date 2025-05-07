'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export const columns  = [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => '#SC-' + row.id
  },
  {
    accessorKey: 'contractorName',
    header: 'Contractor Info',
    cell: ({ row }) => {
      const name = row.original?.contractorName || '-'
      const email = row.original?.contractorEmail || '-'
      const phone = row.original?.contractorPhone || '-'


      return (
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-500">{email}</div>
          {/* <div className="text-sm text-gray-500">{phone}</div> */}

        </div>
      )
    }
  },

  {
    accessorKey: 'contractorPhone',
    header: 'Phone',
    cell: ({ row }) => {
      return row.original?.contractorPhone
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
        words.length > 7 ? words.slice(0, 4).join(' ') + '...' : fullAddress

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='cursor-pointer '>
              {shortAddress}
            </TooltipTrigger>
            <TooltipContent className='rounded-sm bg-gray-600 text-sm '>
              {fullAddress}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },

  {
    accessorKey: 'numberBid',
    header: 'Number Of Bid',
      accessorFn: () => '25'
  },
  {
    accessorKey: 'numberWon',
    header: 'Number Of Won',
      accessorFn: () => '15'
  },
  {
    accessorKey: 'LastLogged',
    header: 'Last Logged In',
      accessorFn: () => '10/03/2025'
  },
  {
    accessorKey: 'viewedJob',
    header: 'Viewed Job',
      accessorFn: () => '12'
  },

  {
    accessorKey: 'logo',
    header: ' Logo',
    cell: ({ row }) => (
      <img
        src={row.original.logo}
        alt='Contractor Logo'
        width={50}
        height={50}
      />
    )
  },
  {
    accessorKey: 'certifications',
    header: 'Certifications',
    cell: ({ row }) => {
      const certificationData = {
        GAF: {
          values: Array.isArray(row.original.gafCertifications)
            ? row.original.gafCertifications.filter(Boolean)
            : row.original.gafCertifications
                ?.split(',')
                .map(item => item.trim())
                .filter(Boolean) || [],
          image: '/images/GAF_logo.svg.webp'
        },
        CertainTeed: {
          values: Array.isArray(row.original.certineedCertifications)
            ? row.original.certineedCertifications.filter(Boolean)
            : row.original.certineedCertifications
                ?.split(',')
                .map(item => item.trim())
                .filter(Boolean) || [],
          image: '/images/Certainteed-Logo.jpg'
        },
        'Owens Corning': {
          values: Array.isArray(row.original.owensCoringCertifications)
            ? row.original.owensCoringCertifications.filter(Boolean)
            : row.original.owensCoringCertifications
                ?.split(',')
                .map(item => item.trim())
                .filter(Boolean) || [],
          image: '/images/Owens_Corning_logo.svg.png'
        }
      }

      const hasCertifications = Object.values(certificationData).some(
        data => data.values.length > 0
      )

      if (!hasCertifications) return '-'

      return (
        <Accordion type='single' collapsible className='min-w-48 max-w-48'>
          {Object.entries(certificationData).map(
            ([key, { values, image }], index) =>
              values.length > 0 ? (
                <AccordionItem
                  key={key}
                  value={`item-${index}`}
                  className='accordian-ittle border-none'
                >
                  <AccordionTrigger>
                    <div className='flex items-center gap-1'>
                      <img
                        src={image}
                        alt={key}
                        className='h-7 w-7 rounded-full bg-gray-50 object-contain'
                      />
                      <strong className='text-sm'>{key}</strong>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-wrap gap-1'>
                      {values.map((value, idx) => (
                        <span
                          key={idx}
                          className='rounded-md bg-gray-200 px-2 py-1 text-xs'
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : null
          )}
        </Accordion>
      )
    }
  },
]

