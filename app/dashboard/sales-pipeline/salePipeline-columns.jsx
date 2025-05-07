'use client'

export const SalePipelineColumns = (handleDeleteLeads, handleEditLeads) => [
  {
    header: 'Lead Id',
    cell: ({ row }) => `#0${row.index + 1}`
  }
,
  {
    accessorKey: 'assignee',
    header: 'Assignee',
    cell: ({ row }) => row.original.assignee
  },
  {
    accessorKey: 'projectName',
    header: 'Project Name',
    cell: ({ row }) => row.original.projectName
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status
  },  
  {
    accessorKey: 'EstValue',
    header: 'Est. Value',
    cell: ({ row }) => row.original.EstValue
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => row.original.company
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => row.original.company
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => row.original.priority
  },
  {
    accessorKey: 'nextStep',
    header: 'Next Step',
    cell: ({ row }) => row.original.nextStep 
  }
]
