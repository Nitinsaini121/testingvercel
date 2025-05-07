'use client'

import { useDebounce } from '@/hooks/quote/useDebounce'
import api from '@/lib/api'
import { MaterialService } from '@/services/material-api'
import { Trash } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import { QuoteBulkModal } from '../modal/quote/bulkQuote'
import FormInputField from '../share/form/FormInputField'
import SelectFilter from '../share/form/SelectFilter'
import { Button } from '../ui/button'
import { Card, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
const defaultRow = {
  item: '',
  description: '',
  qty: '',
  cost: '',
  margin: '',
  commission: '',
  price: '',
  total: '',
  notes: ''
}

const MaterialQuotesFields = ({ form }) => {
  const [customer, setCustomer] = useState([])
  const [materialItem, setMaterialItem] = useState([])
  const { control, watch, setValue, getValues } = form
  const [page, setPage] = useState('')
  const [length, setLength] = useState('')
  const {
    fields: materialFields,
    append: materialAppend,
    remove: materialRemove
  } = useFieldArray({
    control,
    name: 'materialItems'
  })

  const {
    fields: additionalField,
    append: additionalAppend,
    remove: additionalRemove
  } = useFieldArray({
    control,
    name: 'additionalItems'
  })

  // 2. Then useWatch for real-time form values
  const materialItems = useWatch({
    control,
    name: 'materialItems'
  })

  // 3. Memoize selectedValues from materialItems and materialFields
  const selectedValues = useMemo(() => {
    return (
      materialItems?.map((item, index) => ({
        id: materialFields[index]?.id,
        ...item
      })) || []
    )
  }, [JSON.stringify(materialItems), JSON.stringify(materialFields)])

  // 4. Debounce the selected values
  const debouncedSelectedValues = useDebounce(selectedValues, 500)

  // 5. useEffect to fetch data
  useEffect(() => {
    const fetchMaterialData = async () => {
      for (let i = 0; i < debouncedSelectedValues.length; i++) {
        const itemTitle = debouncedSelectedValues[i]?.item
        const margin = Number(debouncedSelectedValues[i]?.margin / 100)
        const price = Number(
          debouncedSelectedValues[i]?.cost / (1 - margin)
        ).toFixed(2)
        if (price) {
          setValue(`materialItems.${i}.price`, price)
        }
        const commission = Number(debouncedSelectedValues[i]?.commission / 100)
        const commissionAmount = Number(price * commission)
        const total = Number(
          (
            debouncedSelectedValues[i]?.qty *
              debouncedSelectedValues[i]?.price +
            commissionAmount
          ).toFixed(2)
        )

        if (!itemTitle) continue

        try {
          const response = await api.get(
            `materials?limit=100&take_all=false&title=${itemTitle}`
          )

          if (response?.status === 200) {
            const material = response.data?.data?.[0]
            console.log('materialmaterial', material)
            const currentQty = getValues(`materialItems.${i}.qty`)
            const currentCost = getValues(`materialItems.${i}.cost`)
            const currentDescription = getValues(
              `materialItems.${i}.description`
            )

            if (!currentQty) {
              setValue(`materialItems.${i}.qty`, material.qty)
            }
            if (!currentCost) {
              setValue(`materialItems.${i}.cost`, material.cost)
            }
            if (!currentDescription) {
              setValue(`materialItems.${i}.description`, material.description)
            }

            if (!total) {
              setValue(`materialItems.${i}.total`, material.total)
            } else {
              setValue(`materialItems.${i}.total`, total)
            }
          }
        } catch (error) {
          console.error('Error fetching material data', error)
        }
      }
    }

    fetchMaterialData()
  }, [debouncedSelectedValues])

  const additionalItems = useWatch({
    control,
    name: 'additionalItems'
  })
  // 3. Memoize selectedValues from additionalItems and materialFields
  const selectedValue = useMemo(() => {
    return (
      additionalItems?.map((item, index) => ({
        id: additionalField[index]?.id,
        ...item
      })) || []
    )
  }, [JSON.stringify(additionalItems), JSON.stringify(additionalField)])

  // 4. Debounce the selected values
  const debouncedSelectedValue = useDebounce(selectedValue, 500)
  console.log('selectedValueselectedValue', debouncedSelectedValue)
  // 5. useEffect to fetch data
  useEffect(() => {
    const fetchMaterialData = async () => {
      for (let i = 0; i < debouncedSelectedValue.length; i++) {
        const itemTitle = debouncedSelectedValue[i]?.item
        const margin = Number(debouncedSelectedValue[i]?.margin / 100)
        const price = Number(
          debouncedSelectedValue[i]?.cost / (1 - margin)
        ).toFixed(2)
        if (price) {
          setValue(`additionalItems.${i}.price`, price)
        }
        const commission = Number(debouncedSelectedValue[i]?.commission / 100)
        const commissionAmount = Number(price * commission)
        const total = Number(
          (
            debouncedSelectedValue[i]?.qty * debouncedSelectedValue[i]?.price +
            commissionAmount
          ).toFixed(2)
        )

        // if(total){
        //     setValue(`additionalItems.${i}.total`, total)
        // }
        if (!itemTitle) continue

        try {
          const response = await api.get(
            `materials?limit=100&take_all=false&title=${itemTitle}`
          )

          if (response?.status === 200) {
            const material = response.data?.data?.[0]
            console.log('materialmaterial', material)
            const currentQty = getValues(`additionalItems.${i}.qty`)
            const currentCost = getValues(`additionalItems.${i}.cost`)
            const currentDescription = getValues(
              `additionalItems.${i}.description`
            )

            if (!currentQty) {
              setValue(`additionalItems.${i}.qty`, material.qty)
            }
            if (!currentCost) {
              setValue(`additionalItems.${i}.cost`, material.cost)
            }
            if (!currentDescription) {
              setValue(`additionalItems.${i}.description`, material.description)
            }
            if (!total) {
              setValue(`additionalItems.${i}.total`, material.total)
            } else {
              setValue(`additionalItems.${i}.total`, total)
            }
          }
        } catch (error) {
          console.error('Error fetching material data', error)
        }
      }
    }

    fetchMaterialData()
  }, [debouncedSelectedValue, setValue])

  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [customerRes, tagRes] = await Promise.all([
          api.get('customers?limit=100&take_all=true'),
          MaterialService.getMaterialList(length, page)
        ])
        if (customerRes.status === 200) {
          const modifyProjectData = customerRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })

          setCustomer(modifyProjectData)
        }

        if (tagRes.status === 200) {
          const modifyProjectData = tagRes?.data?.data.map(item => {
            return {
              label: item.lable,
              value: item?.item
            }
          })
          console.log('modifyProjectData', modifyProjectData)

          setMaterialItem(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  const materialTotalSum = useMemo(() => {
    return (
      materialItems?.reduce((acc, curr) => {
        const total = parseFloat(curr?.total || 0)
        return acc + (isNaN(total) ? 0 : total)
      }, 0) || 0
    )
  }, [materialItems])

  const additionalTotalSum = useMemo(() => {
    return (
      additionalItems?.reduce((acc, curr) => {
        const total = parseFloat(curr?.total || 0)
        return acc + (isNaN(total) ? 0 : total)
      }, 0) || 0
    )
  }, [additionalItems])
  setValue('additional_total', Number(additionalTotalSum.toFixed(2)))
  setValue('material_total', Number(materialTotalSum.toFixed(2)))
  setValue('total', (materialTotalSum + additionalTotalSum).toFixed(2))
  /// bulk popup handler

  const [dialogOpen, setDialogOpen] = useState(false)
  const [formType, setFormType] = useState(null)
  const handleOpenDialog = type => {
    setFormType(type)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  /// bulk handler
  const handleBulkQuotesSubmit = (selectedRows, selectedTargets) => {
    if (selectedTargets.includes('materialQuotes')) {
      selectedRows.forEach(row => {
        console.log('rowrowrow', row)
        materialAppend({
          item: row.item,
          title: row.title,
          description: row.description,
          qty: row.qty,
          cost: row.cost,
          margin: row.margin,
          commission: row.commission,
          price: row.price,
          total: row.total,
          notes: row.notes
        })
      })
    }

    if (selectedTargets.includes('additionalQuotes')) {
      selectedRows.forEach(row => {
        additionalAppend({
          item: row.item,
          title: row.title,
          description: row.description,
          qty: row.qty,
          cost: row.cost,
          margin: row.margin,
          commission: row.commission,
          price: row.price,
          total: row.total,
          notes: row.notes
        })
      })
    }
  }

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        <SelectFilter
          form={form}
          name='customer_id'
          placeholder='Select Customer'
          label='Customer'
          options={customer}
        />
        <FormInputField
          form={form}
          name='ship_to'
          placeholder='Ship To'
          label='Ship To'
        />
      </div>
      <Separator />
      <Card>
        <CardHeader className='flex'>
          {' '}
          <span>Material Quote</span>{' '}
          <Button
            type='button'
            size='sm'
            className='h-6 w-24 gap-1 rounded bg-cyan-400 p-2 text-slate-600 shadow-none'
            onClick={() => handleOpenDialog('search')}
          >
            Add Bulk
          </Button>
        </CardHeader>
      </Card>
      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'></TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Item
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Description
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Qty
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Cost
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Margin
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Commission
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Price
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Total
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Notes
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materialFields.map((item, index) => (
            <TableRow key={item.id} className='hover:bg-gray-100'>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <Trash
                  className='h-4 w-4 text-red-500'
                  onClick={() => materialRemove(index)}
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <SelectFilter
                  form={form}
                  name={`materialItems.${index}.item`}
                  placeholder='Select Item'
                  options={materialItem}
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`materialItems.${index}.description`}
                  placeholder='Description'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`materialItems.${index}.qty`}
                  placeholder='Qty'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`materialItems.${index}.cost`}
                  placeholder='Cost'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`materialItems.${index}.margin`}
                  placeholder='Margin'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`materialItems.${index}.commission`}
                  placeholder='Commission'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`materialItems.${index}.price`}
                  placeholder='Price'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`materialItems.${index}.total`}
                  placeholder='Total'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`materialItems.${index}.notes`}
                  placeholder='Notes'
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className='bg-gray-100 font-semibold'>
            <TableCell colSpan={8} className='pr-4 text-right'>
              Material Total
            </TableCell>
            <TableCell>${materialTotalSum.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        type='button'
        onClick={() => materialAppend(defaultRow)}
        className='mt-2'
      >
        Add More
      </Button>

      <Separator />
      <Card>
        <CardHeader>Additional Quote</CardHeader>
      </Card>
      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'></TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Item
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Description
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Qty
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Cost
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Margin
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Commission
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Price
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Total
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Notes
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {additionalField.map((item, index) => (
            <TableRow key={item.id} className='hover:bg-gray-100'>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <Trash
                  className='h-4 w-4 text-red-500'
                  onClick={() => additionalRemove(index)}
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <SelectFilter
                  form={form}
                  name={`additionalItems.${index}.item`}
                  placeholder='Select Item'
                  options={materialItem}
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`additionalItems.${index}.description`}
                  placeholder='Description'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`additionalItems.${index}.qty`}
                  placeholder='Qty'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`additionalItems.${index}.cost`}
                  placeholder='Cost'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`additionalItems.${index}.margin`}
                  placeholder='Margin'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`additionalItems.${index}.commission`}
                  placeholder='Commission'
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`additionalItems.${index}.price`}
                  placeholder='Price'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`additionalItems.${index}.total`}
                  placeholder='Total'
                  disable
                />
              </TableCell>
              <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                <FormInputField
                  form={form}
                  name={`additionalItems.${index}.notes`}
                  placeholder='Notes'
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className='bg-gray-100 font-semibold'>
            <TableCell colSpan={8} className='pr-4 text-right'>
              Additional Total
            </TableCell>
            <TableCell>${additionalTotalSum.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        type='button'
        onClick={() => additionalAppend(defaultRow)}
        className='mt-2'
      >
        Add More
      </Button>

      <div className='mt-4 text-right text-lg font-bold'>
        Grand Total: ${(materialTotalSum + additionalTotalSum).toFixed(2)}
      </div>

      <FormInputField
        form={form}
        name='notes'
        placeholder='Enter Notes'
        label='Notes'
      />

      <QuoteBulkModal
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        handleCloseDialog={handleCloseDialog}
        onSubmitBulkQuotes={handleBulkQuotesSubmit}
      />
    </div>
  )
}

export default MaterialQuotesFields
