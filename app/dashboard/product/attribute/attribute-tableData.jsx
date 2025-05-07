'use client'

import DialogBox from '@/components/DialogBox'
import AttributeServices from '@/components/services/attribute-api'
import { TablePagination } from '@/components/tabel-pagination'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
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
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import EditAttributeForm from './edit-form'

const AttributeTableData = ({
  allAttribute,
  loading,
  setLoading,
  getAllAttributes,
  totalRecord,
  page,
  setPage,
  length
}) => {
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [editOpenModal, setEditOpenModal] = useState(false)
  const [editData, setEditData] = useState(null)

  // Delete action
  const onDelete = async () => {
    if (deleteIndex !== null) {
      setLoading(true)
      try {
        const response =
          await AttributeServices.deleteAttributesById(deleteIndex)
          setDeleteOpenModal(false)
        if (response?.status === 200) {
          await getAllAttributes()
          successMessage({ description: response.data.message })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDeleteAttribute = id => {
    setDeleteOpenModal(true)
    setDeleteIndex(id)
  }

  const handleEditAttribute = data => {
    setEditData(data)
    setEditOpenModal(true)
  }

  // Define table columns
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: info => info.getValue()
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: info => info.getValue()
    },
    {
      header: 'Terms',
      accessorKey: 'configAttributes',
      cell: info => (
        <>
          {info
            .getValue()
            .map(data => data.name)
            .join(', ')}
          <br />
          <a
            href={`/dashboard/product/configure-attributes?attributeId=${info.row.original.id}`}
            className='custom-link text-blue-500 hover:text-blue-700'
          >
            Configure attributes
          </a>
        </>
      )
    }
  ]

  const table = useReactTable({
    data: allAttribute || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className='rounded-6 border-color-grey custom-tabels border'>
        <Table>
          <TableHeader className='theme-bg-light-rgba'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className='border-color-grey text-dark-color theme-bg-light-rgb border-b p-3 text-sm'
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
                <TableHead className='border-color-grey text-dark-color theme-bg-light-rgb border-b p-3 text-sm'>
                  Action
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Show Spinner when loading */}
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-24 text-center'
                >
                  <Spinner
                    size='lg'
                    className='m-auto bg-black dark:bg-white'
                  />
                </TableCell>
              </TableRow>
            ) : table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  className='group transition hover:bg-gray-100'
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='px-3 py-2 text-sm'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className='whitespace-nowrap'>
                    <TooltipProvider>
                      {/* Edit Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-green-600 hover:bg-green-300'
                            onClick={() => handleEditAttribute(row.original)}
                          >
                            <Edit className='h-5 w-5' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className='rounded-sm bg-gray-600 text-sm'>Edit</TooltipContent>
                      </Tooltip>

                      {/* Delete Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-red-600 hover:bg-red-300'
                            onClick={() =>
                              handleDeleteAttribute(row.original.id)
                            }
                          >
                            <Trash2 className='h-5 w-5' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className='rounded-sm bg-gray-600 text-sm'>Delete</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              /* Show "No results found" if empty */
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-24 text-center text-gray-500'
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TablePagination
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />

      {/* Edit Form Dialog */}
      {editData && (
        <EditAttributeForm
          open={editOpenModal}
          setOpen={setEditOpenModal}
          data={editData}
          getAllAttributes={getAllAttributes}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DialogBox
        onDelete={onDelete}
        description='Are you sure you want to delete this attribute?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={() => setDeleteOpenModal(false)}
      />
    </>
  )
}

export default AttributeTableData
