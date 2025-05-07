'use client'

import FormInputField from '@/components/share/form/FormInputField'
import { useFieldArray } from 'react-hook-form'
import { budgetTableHeader, budgetTableKeys } from '../table/budgetTable'

export function BudgetTab({ form }) {
  const { control } = form
  const { fields } = useFieldArray({
    name: 'budgets',
    control
  })

  return (
    <div className='overflow-auto budget-tab pb-4 custom-scroll-bar'>
      <div style={{ width: '800px' }}>
        <table className='min-w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-blue-100 text-center text-xs font-bold'>
              <th colSpan={1} className='!border-none bg-blue-300 p-2'></th>
              <th
                colSpan={15}
                className='border-none bg-blue-300 p-2'
              >
                BUDGET
              </th>
              <th
                colSpan={4}
                className='border border-gray-300 bg-yellow-400 p-2'
              >
                COST/SQFT
              </th>
              <th
                colSpan={5}
                className='border border-gray-300 bg-green-400 p-2'
              >
                COST
              </th>
            </tr>
            <tr className='whitespace-nowrap bg-blue-50 text-center text-xs font-semibold'>
              <th rowSpan={2} className='border border-gray-300 p-2'>
                BLDG
              </th>
              {budgetTableHeader.map((header, i) => (
                <th key={i} className='border border-gray-300 p-2'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className='text-center'>
                <td className='border border-gray-300 p-1.5'>
                  <FormInputField
                    name={`budgets.${index}.site_name`}
                    className='h-6 !border-none px-1 text-[10px]'
                    inputMode='text'
                    control={form.control}
                    readOnly
                  />
                </td>
                {budgetTableKeys?.map((key, i) => {
                  const isEditable = [
                    'budget_total',
                    'sqft_sw_tiedown',
                    'sqft_up_lift',
                    'sqft_sill_plate',
                    'sqft_misc_hardware',
                    'cost_sw_tiedown',
                    'cost_up_lift',
                    'cost_sill_plate',
                    'cost_misc_hardware',
                    'total'
                  ].includes(key)
                  return (
                    <td key={i} className='border border-gray-300 p-1'>
                      {!isEditable ? (
                        <FormInputField
                          name={`budgets.${index}.${key}`}
                          className='h-6 !border-none px-1 text-xs'
                          inputMode='decimal'
                          type='number'
                        />
                      ) : (
                        <input
                          value={form.getValues(`budgets.${index}.${key}`)}
                          readOnly
                          className='h-6 w-20 !border-none bg-gray-100 px-1 text-xs'
                        />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
