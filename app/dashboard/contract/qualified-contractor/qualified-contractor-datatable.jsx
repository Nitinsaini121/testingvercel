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
import { Edit, Eye, Merge, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'


export function DataTable({
  columns,
  data,
  handleDeleteContract,
  handleEditContract,
  totalRecord,
  page,
  setPage,
  loading,
  length,
  handleMergeCell
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  const router = useRouter()
  return (
    <>
      <div className='grey-border border-color-grey custom-tabels rounded border'>
        <Table>
          {/* Table Headers are Always Rendered */}
          <TableHeader className='theme-bg-light-rgba'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className='border-color-grey text-dark-color theme-bg-light-rgba h-14 border-b'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead className='border-color-grey text-dark-color theme-bg-light-rgba border-b'>
                  Action
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>

          {/* Show spinner or empty state */}
          <TableBody>
            {loading ? (
              <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className='h-16 text-center'
              >
                <Spinner size='lg' className='m-auto bg-black dark:bg-white' />
              </TableCell>
            </TableRow>
            ) : data.length === 0 ? (
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
                  className={`table-content ${
                    row.original?.refId
                      ? 'bg-orange-100 hover:bg-orange-100'
                      : ''
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className='data-cell border-color-grey border-b'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className='border-color-grey whitespace-nowrap border-b'>
                    <TooltipProvider>
                      {/* View Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-gray-600 hover:bg-gray-300'
                            onClick={() =>
                              router.push(
                                `/dashboard/contract/qualified-contractor/viewpage?id=${row.original.id}`
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

                      {/* Edit Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-green-600 hover:bg-green-300'
                            onClick={() => handleEditContract(row)}
                          >
                            <Edit className='h-5 w-5' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                          Edit
                        </TooltipContent>
                      </Tooltip>

                      {/* Delete Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-red-600 hover:bg-red-300'
                            onClick={() => handleDeleteContract(row)}
                          >
                            <Trash2 className='h-5 w-5' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
                          Delete
                        </TooltipContent>
                      </Tooltip>

                      {/* Merge Button (only if refId exists) */}
                      {row.original?.refId && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='text-blue-600 hover:bg-blue-300'
                              onClick={() => handleMergeCell(row)}
                            >
                              <Merge className='h-5 w-5' />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className='text-dark-color rounded-lg'>
                            Merge
                          </TooltipContent>
                        </Tooltip>
                      )}
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
