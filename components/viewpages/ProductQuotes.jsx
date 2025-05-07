'use client'
import { useEffect, useRef, useState } from 'react'
import DimensionService from '../services/dimension-Service'
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
  console.log('fieldsfields', fields)
  console.log('data', data)
  const [productItem, setProductItem] = useState([])
  const [dimension, setDimension] = useState()
  const [productData, setProductData] = useState()
  const [defaultDataLoad, setDeafoultDataLoad] = useState([])

  const fetchRoofMeasure = async () => {
    try {
      const response = await DimensionService?.roofMeasureId(leadId)
      console.log('ProductQoute', response)
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
  let def = 'kg'
  useEffect(() => {
    const product = data.flatMap(item => item.products || [])
    setProductItem(product)
  }, [data])

  const createProductNameSku = products => {
    const items = []

    products?.forEach(product => {
      console.log('product', product)
      let parsedData
      try {
        parsedData =
          typeof product.data === 'string'
            ? JSON.parse(product.data)
            : product.data
      } catch {
        parsedData = {}
      }
      items.push({
        label: parsedData?.sku
          ? `${product.productName} (${parsedData?.sku})`
          : product.productName,
        value: product.variationId,
        id: product.variationId,
        sku: parsedData.sku,
        name: parsedData.name,
        cost: parsedData.cost,
        price: parsedData.price,
        colourLabel: parsedData.colourLabel
      })
    })

    return items
  }


  const defaultDataRef = useRef([])

  useEffect(() => {
    setTimeout(() => {
      defaultDataRef.current?.forEach((field, index) => {
        form.setValue(`quotes.${index}.uom`, field?.uom)
        form.setValue(`quotes.${index}.cost`, field?.cost)
        form.setValue(`quotes.${index}.margin`, field?.margin)
        form.setValue(`quotes.${index}.quantity`, field?.quantity == "" ? 1 : field?.quantity)

      })
      console.log('defaultDataRef', defaultDataRef.current)
    }, 3000)
  }, [])
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
              Waste
            </TableHead>
            <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => {
            //         const selectedProductId = useWatch({
            //   control: form.control,
            //   name: `quotes.${index}.productId`,
            // })
            const selectedProductId = form.watch(`quotes.${index}.productId`)
            console.log('selectedProductId', selectedProductId)

            const matchedCategorys = data.find(
              item => String(item.id) === String(field.categoryId)
            )

            // Grab all product variations from the category
            const productVariants = matchedCategorys?.products || []
            let selectedProduct = productVariants.find(
              p => String(p.variationId) === String(selectedProductId)
            )
            if (!selectedProduct) {
              selectedProduct = productVariants.find(
                p => String(p.variationId) === String(field.productId)
              )
            }

            const productDatas = selectedProduct?.data || {}
            console.log('productDatas', productDatas)
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
              // const {} = matchedCategory.products.data
              catUOM = 'area(sqft):'
              catArea = Math.ceil(Number(dimension?.roofArea) / 0.9)
              console.log('productDatas', productDatas?.lf)

              // catArea = Number(6341) / 0.9
              itemTotal =
                Math.ceil(
                  (catArea / productDatas?.coverageAreaSoftUnit) *
                    productDatas?.unitsPerSq
                ) || '#'
              itemName = 'bundles:'
            }
            if (field?.categoryName === 'Starter') {
              catUOM = 'starter(lf):'
              catArea = Math.ceil(Number(dimension?.starter) / 0.9)
              itemTotal = Math.ceil(catArea / productDatas?.lf)
              itemName = 'bundles:'
            }
            if (field?.categoryName === 'Roof Underlayment') {
              catUOM = 'area(sqft):'
              catArea = Math.ceil(Number(dimension?.roofArea) / 0.9)
              itemTotal =
                Math.ceil(catArea / productDatas?.coverageAreaSoftUnit) || '#'
              itemName = 'rolls:'
            }
            if (field?.categoryName === 'Ice & Water') {
              catUOM = 'valleys+wall flash+step:'
              catArea = Math.ceil(
                (Number(dimension?.valleys) +
                  Number(dimension?.wallFlash) +
                  Number(dimension?.step)) /
                  0.9
              )

              itemTotal = Math.ceil(catArea / productDatas?.lf) || '#'
              itemName = 'rolls:'
            }
            if (field?.categoryName === 'Ridge Cap') {
              catUOM = 'hips + ridges:'

              catArea = Math.ceil(
                (Number(dimension?.hips) + Number(dimension?.ridges)) /
                  (1 - 0.1)
              )
              itemName = 'bundles:'
              itemTotal =
                Math.ceil(
                  (catArea / productDatas?.lf) * productDatas?.bundlesPerLf
                ) || '#'
            }
            if (field?.categoryName === 'Nails') {
              catUOM = 'Nails:'
              catArea = Math.ceil(Number(dimension?.roofArea) / (1 - 0.1))
              itemName = 'ea(bx of 7.2M):'

              itemTotal =
                Math.ceil(
                  ((catArea / 0.8 / 100) * productDatas?.unitsPerSq) /
                    productDatas?.eaPerUnit
                ) || '#'
              nails =
                Math.ceil(
                  ((catArea / 0.7 / 100) * productDatas?.unitsPerSq) /
                    productDatas?.eaPerUnit
                ) || '#'
              nailsName = 'ea(bx of 3m):'
            }
            if (field?.categoryName === 'Step Flashing') {
              catUOM = 'step(lf):'

              catArea = Math.ceil(Number(dimension?.step) / (1 - 0.1))
              // itemName = 'rolls'
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
            // unitsLinear = 'UNITS/(LF): 10'
            const Testing = data[index].products
            const reCheck = Testing.filter(
              item => item.variationId == field.productId
            )
            console.log("reCheck",reCheck)

            defaultDataRef.current[index] = reCheck[0]?.data
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
                          value: String(product?.value)
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
                      name={`quotes.${index}.waste`}
                      placeholder='0'
                      type='number'
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
