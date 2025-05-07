import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import FormSelectField from '../share/form/FormSelect'
export default function BudgetveOptionsTab({ form }) {
  const { control, setValue } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'veOptions' // key will be match default
  })
  // Define the default row
  const defaultRow = {
    groups: '',
    subject: '',
    description: '',
    amount: ''
  }
  // Append the default row only if no rows exist
  useEffect(() => {
    if (fields.length === 0) {
      append(defaultRow)
      setValue('veOptions', [defaultRow]) // Set values manually to ensure all fields are initialized
    }
    console.log('Form Values:', form.getValues()) // Debugging
  }, [append, fields.length, form, setValue])

  const groupsData = [
    {
      label: 'Ve Option',
      value: '1'
    },
    {
      label: 'Sill Plate Options',
      value: '2'
    },
    {
      label: 'Specialty conditons',
      value: '3'
    }   
  ]
  return (
    <div className='space-y-4'>
      <div className='option-tab overflow-auto rounded border'>
        <table className='min-w-full'>
          <thead className='theme-bg-light-rgba border-b'>
            <tr>
              <th
                rowSpan={2}
                className='px-1 py-2 text-sm font-semibold capitalize'
              ></th>
              <th
                rowSpan={2}
                className='px-1 py-2 text-sm font-semibold capitalize'
              >
                Groups
              </th>
              <th
                rowSpan={2}
                className='px-1 py-2 text-sm font-semibold capitalize'
              >
                Subject
              </th>
              <th
                rowSpan={2}
                className='px-1 py-2 text-sm font-semibold capitalize'
              >
                Description
              </th>
              <th
                rowSpan={2}
                className='px-1 py-2 text-sm font-semibold capitalize'
              >
                amount
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className='text-center'>
                <td className='px-2 pb-2 pt-3'>
                  {index !== 0 && (
                    <Button
                      type='button'
                      variant='ghost'
                      className='h-6 w-6 p-0'
                      onClick={() => remove(index)}
                    >
                      <Trash2 className='h-4 w-4 text-red-500' />
                    </Button>
                  )}
                </td>
                {Object.keys(defaultRow).map(key => (
                  <td key={key} className='px-2 pb-2 pt-3'>
                    {key === 'groups' ? (
                      <FormSelectField
                        name={`veOptions.${index}.${key}`}
                        type={key == 'amount' ? 'number' : 'text'}
                        className='h-10 px-1 text-[12px]'
                        inputMode='decimal'
                        defaultValue={form.getValues(
                          `veOptions.${index}.${key}`
                        )}
                        options={groupsData}
                      />
                    ) : (
                      <FormInputField
                        name={`veOptions.${index}.${key}`}
                        type={key == 'amount' ? 'number' : 'text'}
                        className='h-8 px-1 text-[12px]'
                        inputMode='decimal'
                        defaultValue={form.getValues(
                          `veOptions.${index}.${key}`
                        )}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-3'>
        <Button
          type='button'
          onClick={() => append(defaultRow)}
          className='site-button'
        >
          Add More
        </Button>
      </div>
    </div>
  )
}
