'use client'

import { TablePagination } from '@/components/tabel-pagination'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DataTableProps<TData extends { id: string }, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  handleDeleteUser: (row: { original: TData }) => void
  handleEditUser: (row: { original: TData }) => void
  totalRecord: number
  page: number
  setPage: (page: number) => void
  length: number
  loading: boolean
    
}

export function DataTable<TData extends { id: string }, TValue = unknown>({
  columns,
  data,
  loading,
  handleDeleteUser,
  handleEditUser,
  totalRecord,
  page,
  setPage,
  length
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  const router = useRouter()

  return (
    <>
      <div className='rounded-6 border-color-grey custom-tabels border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className='border-color-grey h-12 text-dark-color theme-bg-light-rgba border-b p-3'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead className='h-12 border-color-grey text-dark-color theme-bg-light-rgba border-b p-3'>
                  Action
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-16 text-center'
                >
                  <Spinner
                    size='lg'
                    className='m-auto bg-black dark:bg-white'
                  />
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='border-color-grey p-10 text-center text-gray-500'
                >
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className='border-color-grey border-b p-3'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className='border-color-grey whitespace-nowrap border-b p-3'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-gray-600 hover:bg-gray-300'
                            onClick={() =>
                              router.push(
                                `/dashboard/workorders/viewpage?id=${row.original.id}`
                              )
                            }
                          >
                            <Eye className='h-5 w-5' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                          View
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
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />
    </>
  )
}
