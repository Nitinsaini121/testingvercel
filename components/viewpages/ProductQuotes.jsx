'use client'
import { useEffect, useState } from 'react'
import DimensionService from '../../services/dimension-Service'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import SelectFilter from '../share/form/SelectFilter'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

const ProductQuotes = ({ leadId, form, data, fields, grandTotal }) => {
  const [productItem, setProductItem] = useState([])
  const [dimension, setDimension] = useState()
  const fetchRoofMeasure = async () => {
    try {
      const response = await DimensionService?.roofMeasureId(leadId)
      if (response.status === 200) {
        if (response?.data?.status === true) {
          setDimension(response?.data?.data)
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (error) {
      console.log('erroer', error)
      // errorMessage({ description: error?.response?.data?.message })
    }
  }
  useEffect(() => {
    if (leadId) {
      fetchRoofMeasure()
    }
  }, [leadId])

  const uomOptions = ['kg', 'm', 'pcs', 'box', 'liters']
  useEffect(() => {
    const product = data.flatMap(item => item.products || [])
    setProductItem(product)
  }, [data])

  const createProductNameSku = products => {
    const items = []

    products?.forEach(product => {
      let parsedData
      try {
        parsedData =
          typeof product.data === 'string'
            ? JSON.parse(product.data)
            : product.data
      } catch {
        parsedData = {}
      }
      console.log('parsedData', parsedData)
      items.push({
        label: parsedData?.sku
          ? `${product.productName} (${parsedData.sku})`
          : product.productName,
        value: product.variationId,
        id: product.productId,
        sku: parsedData.sku,
        name: parsedData.name,
        cost: parsedData.cost,
        price: parsedData.price,
        colourLabel: parsedData.colourLabel
      })
    })

    return items
  }

  // console.log('createProductNameSku', createProductNameSku())

  return (
    <>
      <Table className='w-full border-collapse border border-gray-100 text-black'>
        <TableHeader>
          <TableRow className='bg-gray-300'>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Item
            </TableHead>
            <TableHead className='w-2/12 border border-gray-100 px-4 py-2 text-left'>
              Description
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Cost
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Margin
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Price
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Qty
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              UOM
            </TableHead>

            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => {
            let catUOM = ''
            let catArea = ''
            let itemTotal = ''
            let itemName = ''
            let nails = ''
            let nailsName = ''
            let converageArea = ''
            let unitsLinear = ''
            let unitSquare = ''
            let rollLength = ''
            let rollWidth = ''

            if (field?.categoryName === 'Shingle Products') {
              catUOM = 'area(sqft):'
              catArea = Math.ceil(Number(dimension?.roofArea) / 0.9)
              // catArea = Number(6341) / 0.9
              itemTotal = Math.ceil((catArea / 100) * 3)
              itemName = 'bundles:'
              unitSquare = 'unitSquare: 3'
              converageArea = 'COVERAGE AREA: 34%'
            }
            if (field?.categoryName === 'Starter') {
              catUOM = 'starter(lf):'
              catArea = Math.ceil(Number(dimension?.starter) / 0.9)
              itemTotal = Math.ceil(catArea / 120)
              itemName = 'bundles:'
              unitsLinear = 'UNITS/(LF): 120.33'
            }
            if (field?.categoryName === 'Roof Underlayment') {
              catUOM = 'area(sqft):'
              catArea = Math.ceil(Number(dimension?.roofArea) / 0.9)
              itemTotal = Math.ceil(catArea / 1000)
              itemName = 'rolls:'
              converageArea = 'COVERAGE AREA: 1000'
              rollLength = 'Roll Length(FT): 250'
              rollWidth = 'Roll Width(IN)'
            }
            if (field?.categoryName === 'Ice & Water') {
              catUOM = 'valleys+wall flash+step:'
              catArea = Math.ceil(
                (Number(dimension?.valleys) +
                  Number(dimension?.wallFlash) +
                  Number(dimension?.step)) /
                  0.9
              )

              itemTotal = Math.ceil(catArea / 66.667)
              itemName = 'rolls:'
              unitsLinear = 'UNITS/(LF): 66.667'
              rollLength = 'Roll Length(FT): 67'
            }
            if (field?.categoryName === 'Ridge Cap') {
              catUOM = 'hips + ridges:'

              catArea = Math.ceil(
                (Number(dimension?.hips) + Number(dimension?.ridges)) /
                  (1 - 0.1)
              )
              itemName = 'bundles:'
              itemTotal = Math.ceil((catArea / 100) * 4)
              unitsLinear = 'UNITS/(LF): 120.33'
            }
            if (field?.categoryName === 'Nails') {
              catUOM = 'Nails:'
              catArea = Math.ceil(Number(dimension?.roofArea) / (1 - 0.1))
              itemName = 'ea(bx of 7.2M):'
              itemTotal = Math.ceil(((catArea / 0.8 / 100) * 450) / 7200)
              nails = Math.ceil(((catArea / 0.7 / 100) * 80) / 3000)
              nailsName = 'ea(bx of 3m):'
              converageArea = 'COVERAGE AREA: 34%'
            }
            if (field?.categoryName === 'Step Flashing') {
              catUOM = 'step(lf):'

              catArea = Math.ceil(Number(dimension?.step) / (1 - 0.1))
              // itemName = 'rolls'
              unitsLinear = 'UNITS/(LF): 10'
            }
            if (field?.categoryName === 'Drip Edge') {
              catUOM = 'drip edge(lf):'

              catArea = Math.ceil(Number(dimension?.dripEdge) / (1 - 0.1))
              // itemName = 'rolls'
            }

            if (field?.categoryName === 'Wall Flashing') {
              unitsLinear = 'UNITS/(LF): 10'
            }

            const filterData = data.filter(item => item.id == field.categoryId)
            const productData = filterData.flatMap(item => item.products || [])
            const productOptions = createProductNameSku(productData)

            unitsLinear = 'UNITS/(LF): 10'

            console.log('productOptions', productOptions)

            return (
              <>
                <TableRow key={field.id}>
                  <TableCell>
                    <div className='font-semibold'>{field?.categoryName}</div>
                    {/* <SelectFilter
                          className='h-10'
                          form={form}
                          name={`quotes.${index}.productId`}
                          placeholder='Select Product'
                          userList={productData?.map(option => ({
                            
                            label: option.label,
                            value: String(option.value),
                            tag: String(option.id)
                          }))}
                          error={form.formState.errors?.quotes?.[index]?.productId}
                        /> */}

                    <SelectFilter
                      className='h-10'
                      form={form}
                      name={`quotes.${index}.productId`}
                      placeholder='Select Product'
                      userList={productOptions?.map(product => {
                        return {
                          label: product.label,
                          value: String(product?.id),
                          tag: String(product.id)
                        }
                      })}
                      error={form.formState.errors?.quotes?.[index]?.productId}
                    />
                  </TableCell>
                  <TableCell className='w-2/12 border border-gray-300 px-2 py-2'>
                    <div>
                      <p className='capitalize'>
                        <span>{catUOM}</span>
                        {catArea}
                      </p>
                      <p className='capitalize'>
                        <span>{itemName} </span>
                        {itemTotal}
                        <p>{converageArea}</p>
                        <p>{unitsLinear}</p>
                      </p>
                      <p className='capitalize'>
                        <span>{nailsName} </span>
                        {nails}
                      </p>
                      <p className='capitalize'>{unitSquare}</p>
                      <p className='capitalize'>{rollLength}</p>
                    </div>
                    <FormInputField
                      form={form}
                      name={`quotes.${index}.description`}
                      placeholder='Description'
                      className='!mt-7 h-10 min-h-10'
                    />
                  </TableCell>
                  <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                    <FormInputField
                      className='!mt-7 h-10'
                      form={form}
                      name={`quotes.${index}.cost`}
                      placeholder='$0'
                      type='number'
                      error={form.formState.errors?.quotes?.[index]?.cost}
                    />
                  </TableCell>
                  <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                    <FormInputField
                      className='!mt-7 h-10'
                      form={form}
                      name={`quotes.${index}.margin`}
                      placeholder='0'
                      type='number'
                      error={form.formState.errors?.quotes?.[index]?.margin}
                    />
                  </TableCell>
                  <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                    <FormInputField
                      className='!mt-7 h-10'
                      form={form}
                      name={`quotes.${index}.price`}
                      placeholder='$0'
                      type='number'
                      disable
                    />
                  </TableCell>
                  <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                    <FormInputField
                      className='!mt-7 h-10'
                      form={form}
                      name={`quotes.${index}.quantity`}
                      placeholder='0'
                      type='number'
                    />
                  </TableCell>
                  <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                    <FormSelectField
                      className='!mt-7 h-10'
                      form={form}
                      name={`quotes.${index}.uom`}
                      placeholder='UOM'
                      options={uomOptions.map(uom => ({
                        label: uom,
                        value: uom
                      }))}
                    />
                  </TableCell>

                  <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                    <FormInputField
                      className='!mt-7 h-10'
                      form={form}
                      name={`quotes.${index}.total`}
                      placeholder='$0'
                      type='number'
                      disable
                    />
                  </TableCell>
                </TableRow>
              </>
            )
          })}
        </TableBody>
      </Table>
      <div className='flex justify-between'>
        <div style={{ visibility: 'hidden' }}>Grand Total</div>
        <div style={{ width: '119px' }}>
          Total: &nbsp;{grandTotal > 0 ? grandTotal : '-'}
        </div>
      </div>
    </>
  )
}

export default ProductQuotes
