'use client'

import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'

export default function BudgetSiteTab({ form }) {
  const { control, getValues, setValue, watch } = form

  const {
    fields: siteFields,
    append: appendSite,
    remove: removeSite
  } = useFieldArray({
    control,
    name: 'sites'
  })
  console.log('siteFields', siteFields)

  const {
    fields: budgetFields,
    append: appendBudget,
    remove: removeBudget
  } = useFieldArray({
    control,
    name: 'budgets'
  })

  /// Default row
  const defaultSiteRow = {
    name: '',
    qty: '',
    gs_qft: '',
    ts_qft: '',
    cs_qft: '0.0000',
    ps_qft: '0.00',
    cost: '0.00',
    c_total: '0.00',
    c_sw: '0.00',
    c_up: '0.00',
    c_sp: '0.00',
    c_mc: '0.00',
    pb_sw: '0.00',
    pb_up: '0.00',
    pb_sp: '0.00',
    pb_mc: '0.00',
    pb_tot: '0.00',
    p_tot: '0.00',
    p_sw: '0.00',
    p_up: '0.00',
    p_sp: '0.00',
    p_mc: '0.00'
  }

  // defaultBudgetRow
  const defaultBudgetRow = {
    misc: '',
    post: '',
    sill_plate: '',
    tie_down: '',
    sw_misc: '',
    up_lift: '',
    roof: '',
    coridor: '',
    deck: '',
    stair_wells: '',
    beam: '',
    smu: '',
    stl: '',
    rtu: '',
    budget_total: '0.0000',
    sqft_sw_tiedown: '',
    sqft_up_lift: '',
    sqft_sill_plate: '',
    sqft_misc_hardware: '0.0000',
    cost_sw_tiedown: '0.00',
    cost_up_lift: '0.00',
    cost_sill_plate: '0.00',
    cost_misc_hardware: '0.00',
    total: '0.00'
  }

  // append field according to key
  const handleAppend = () => {
    const currentSites = getValues('sites')
    const siteName = currentSites?.[siteFields.length]?.name || ''

    appendSite(defaultSiteRow)
    appendBudget({ ...defaultBudgetRow, bldg: siteName })
  }
  /// delete row handler
  const deleteRowHandler = index => {
    removeSite(index)
    removeBudget(index)
  }

  return (
    <div className='overflow-auto pb-4 custom-scroll-bar'>
      <div style={{ width: '800px' }}>
        <table className='rounded-6 border text-xs'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 p-2'></th>
              <th className='border border-gray-300 p-2' >
                {/* NAME */}
              </th>
    
              <th className='border border-gray-300 p-2' >
                {/* QTY */}
              </th>
              <th className='border border-gray-300 p-2' >     
                {/* GSQFT */}
              </th>
              <th className='border border-gray-300 p-2' >
                {/* TSQFT */}
              </th>
              <th className='border border-gray-300 p-2' >
                {/* CSQFT */}
              </th>
              <th className='border border-gray-300 p-2' >
                {/* PSQFT */}
              </th>
              <th className='border border-gray-300 p-2' >
                {/* COST */}
              </th>
              <th className='border border-gray-300 p-2' >
                {/* CTOTAL */}
              </th>
              <th
                className='border border-gray-300 p-2 text-center'
                colSpan={4}
              >
                GENERAL DATA
              </th>
              <th
                colSpan={5}
                className='border border-gray-300 p-2 text-center'
              >
                PRICE/BLDG
              </th>
              <th
                colSpan={6}
                className='border border-gray-300 p-2 text-center'
              >
                ALL BLDG TYPE
              </th>
            </tr>
            <tr>
            <th className='border border-gray-300 p-2'></th>
            <th className='border border-gray-300 p-2'>Name</th>
            <th className='border border-gray-300 p-2'>QTY</th>
            <th className='border border-gray-300 p-2'>GSQFT</th>
            <th className='border border-gray-300 p-2'>TSQFT  </th>
            <th className='border border-gray-300 p-2'>CSQFT</th>
            <th className='border border-gray-300 p-2'>PSQFT</th>
            <th className='border border-gray-300 p-2'>COST</th>
            <th className='border border-gray-300 p-2'>CTOTAL</th>



              <th className='border border-gray-300 p-2'>C.SW</th>
              <th className='border border-gray-300 p-2'>C.UP</th>
              <th className='border border-gray-300 p-2'>C.SP</th>
              <th className='border border-gray-300 p-2'>C.MC</th>
              <th className='border border-gray-300 p-2'>PB.SW</th>
              <th className='border border-gray-300 p-2'>PB.UP</th>
              <th className='border border-gray-300 p-2'>PB.SP</th>
              <th className='border border-gray-300 p-2'>PB.MC</th>
              <th className='border border-gray-300 p-2'>PB.TOT</th>
              <th className='border border-gray-300 p-2'>PTOT</th>
              <th className='border border-gray-300 p-2'>P.SW</th>
              <th className='border border-gray-300 p-2'>P.UP</th>
              <th className='border border-gray-300 p-2'>P.SP</th>
              <th className='border border-gray-300 p-2'>P.MC</th>
            </tr>
          </thead>
          <tbody>
            {siteFields.map((field, index) => (
              <tr key={field.id} className='text-center'>
                <td className='px-2 pb-2 pt-3'>
                  <Button
                    type='button'
                    variant='ghost'
                    className='h-6 w-6 p-0'
                    onClick={() => deleteRowHandler(index)}
                  >
                    <Trash2 className='h-4 w-4 text-red-500' />
                  </Button>
                </td>

                {Object.keys(field).map(key => {
                  console.log('key', key)

                  const isEditable = ['name', 'qty', 'gs_qft'].includes(key)

                  // Skip 'id' always
                  if (key === 'id') return null

                  // If field has a 'bid' key, skip rendering the 'bid' field
                  if ('bid' in field && key === 'bid') return null

                  return (
                    <td key={key} className='site-tab'>
                      {isEditable ? (
                        <FormInputField
                          name={`sites.${index}.${key}`}
                          className='h-8 w-20 px-1 text-xs'
                          inputMode='decimal'
                          control={form.control}
                          type={key === 'name' ? 'text' : 'number'}
                        />
                      ) : (
                        <input
                          name={`sites.${index}.${key}`}
                          value={form.getValues(`sites.${index}.${key}`)}
                          readOnly
                          className='h-8 w-20 border border-gray-300 bg-gray-100 px-1 text-xs'
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

      <div className='mt-3'>
        <Button type='button' onClick={handleAppend} className='site-button'>
          Add More
        </Button>
      </div>
    </div>
  )
}
