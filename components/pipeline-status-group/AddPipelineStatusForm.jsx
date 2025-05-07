'use client'

import { Trash } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

export default function AddPipelineStatusForm({ form, setRemovedIds }) {
  const materialType = [
    { label: 'Job', value: 'Job' },
    { label: 'Material', value: 'Material' }
  ]

  const { control } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'statusGroup.status' // ✅ This matches defaultValues structure
  })

  const handleRemove = (index, id) => {
    console.log('iddddddddddd', id)

    if (id) {
      setRemovedIds(prev => [...prev, id])
    }
    remove(index)
  }

  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='name'
          label='Name'
          placeholder='Enter Name'
        />
        <FormSelectField
          form={form}
          name='materialType'
          label='Material Type'
          options={materialType}
        />
      </div>

      <div className='!my-6 flex justify-between'>
        <h4 className='text-xl font-semibold text-gray-800'>Status Group</h4>
      </div>

      <Table className='w-full border text-black'>
        <TableHeader>
          <TableRow className='bg-gray-200'>
            <TableHead className='w-1/12 text-left'>Action</TableHead>
            <TableHead className='w-6/12 text-left'>Status</TableHead>
            <TableHead className='w-5/12 text-left'>Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => {
            console.log('fieldddddddd', field)

            return (
              <TableRow key={field.id} className='hover:bg-gray-50'>
                <TableCell className='py-2'>
                  <button
                    type='button'
                    onClick={() =>
                      handleRemove(
                        index,
                        form.getValues(`statusGroup.status[${index}].id`)
                      )
                    }
                    className='text-red-500 hover:text-red-700'
                  >
                    <Trash className='h-4 w-4' />
                  </button>
                </TableCell>
                <TableCell className='py-2'>
                  <FormInputField
                    form={form}
                    name={`statusGroup.status[${index}].status`} // ✅ updated
                    placeholder='Enter Status'
                  />
                </TableCell>
                <TableCell className='py-2'>
                  <FormInputField
                    form={form}
                    name={`statusGroup.status[${index}].order`} // ✅ updated
                    type='number'
                    placeholder='Enter Order'
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Button
        type='button'
        className='mt-4'
        onClick={() => append({ status: '', order: '' })} // ✅ include id
      >
        + Add More
      </Button>
    </>
  )
}
