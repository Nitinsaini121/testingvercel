import { Work } from '@/types/work-order-type'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Work, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => '#WO-'+row.id
  },
  // {
  //   accessorKey: 'title',
  //   header: 'Title',
  //   accessorFn: row => row.title
  // },
  {
    accessorKey: 'address',
    header: 'Address',
    accessorFn: row => row.address
  },
  {
    accessorKey: 'startDate',
    header: ' Start Date',

    accessorFn: row => {
      if (!row.startDate) return '' 
      const date = new Date(row.startDate)
      return isNaN(date.getTime())
        ? ''
        : date
            .toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(',', '')
    }
  },
  {
    accessorKey: 'finishDate',
    header: 'Finish Date',

    accessorFn: row => {
      if (!row.finishDate) return '' 
      const date = new Date(row.finishDate)
      return isNaN(date.getTime())
        ? ''
        : date
            .toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(',', '')
    }
  },

  {
    accessorKey: 'price',
    header: 'Current Price',
    accessorFn: row => row.price
  }
]
