'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { FormProvider, useForm } from 'react-hook-form'
import FormDatePicker from '../share/form/datePicker'
import FormSelectField from '../share/form/FormSelect'
import FormTextArea from '../share/form/TextArea'
import { errorMessage, successMessage } from '../ToasterMessage'

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>
  },
  {
    accessorKey: 'date',
    header: () => <Button variant='ghost'>Date</Button>,
    cell: ({ row }) => <div>{row.getValue('date')}</div>
  },
  {
    accessorKey: 'interactionType',
    header: () => <Button variant='ghost'>Interaction Type</Button>,
    cell: ({ row }) => <div>{row.getValue('interactionType')}</div>
  },
  {
    accessorKey: 'notes',
    header: () => <Button variant='ghost'>Notes</Button>,
    cell: ({ row }) => <div>{row.getValue('notes')}</div>
  }
]

function LeadInteraction({
  isDialogOpen,
  setIsDialogOpen,
  contractId,
  fetchContractById,
  getActivities
}) {
  // const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  // const [rowSelection, setRowSelection] = useState({})
  const [leadInteraction, setLeadInteraction] = useState({})

  const table = useReactTable({
    data: leadInteraction,
    columns,
    // onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onRowSelectionChange: setRowSelection,
    state: {
      // sorting,
      columnFilters
      // rowSelection
    }
  })

  const form = useForm({})
  const getLeadInteraction = async () => {
    try {
      const res = await api.get(
        `/contract/getLeadInteractionByContractId?contractId=${contractId}`
      )
      if(res?.status===200){

        setLeadInteraction(res.data.data.interaction)
        getActivities()
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    getLeadInteraction()
  }, [])

  const onSubmitLeadInteraction = async data => {
    const payload = { ...data, contractId }
    try {
   const response=   await api.post(`/contract/addLeadInteraction`, payload)
   if(response?.status){
    successMessage({
      description: response?.data?.message
    })

   }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
    getLeadInteraction()
    fetchContractById()
    setIsDialogOpen(false)
    form.reset()
  }

  return (
    <div className='w-full'>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='custom-modal'>
          <DialogHeader>
            <DialogTitle>Add Interaction</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitLeadInteraction)}
              className=''
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                }
              }}
            >
              <FormDatePicker
                name='date'
                form={form}
                label='Date'
                disabled={date =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
              <FormSelectField
                form={form}
                name='interactionType'
                label='Interaction Type'
                options={[
                  { label: 'Email', value: 'Email' },
                  { label: 'SMS', value: 'SMS' },
                  { label: 'Call', value: 'Call' },
                  { label: 'Video Call', value: 'Video Call' }
                ]}
              />
              <FormTextArea
                form={form}
                name='notes'
                label='Notes'
                placeholder='Enter Notes'
                type='text'
                className='!h-12 !max-h-28 !min-h-12 bg-white !pr-7 pt-3 rounded border-color-grey !shadow-none'
              />
              <DialogFooter>
                <Button
                className='site-button-small !bg-white'
                  type='button'
                  onClick={() => setIsDialogOpen(false)}
                  variant='outline'
                >
                  Cancel
                </Button>
                <Button type='submit' className='site-button-small'>Submit</Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      <div className='border rounded border-color-grey'>
        <Table>
          <TableHeader className='header-lead'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className='theme-bg-light-rgba border-b border-color-grey'>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='!py-3'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default LeadInteraction
