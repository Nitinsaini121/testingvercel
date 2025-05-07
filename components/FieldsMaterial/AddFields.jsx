'use client'
import api from '@/lib/api'
import { ChevronDown, ChevronUp, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import { createProductNameSku } from '../productname-sku'
import MaterialQuotesServices from '../services/material-api'
import FormCheckBox from '../share/form/CheckBox'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import SelectFilter from '../share/form/SelectFilter'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

const AddFields = ({ form, editData, editId }) => {
  const {
    fields: materialsQuates,
    append: appendMaterial,
    remove: removeMaterial,
    replace: variationReplace
  } = useFieldArray({
    control: form.control,
    name: 'materialQuotes'
  })

  const [customer, setCustomer] = useState([])
  const [productItem, setProductItem] = useState([])
  const [expandedRows, setExpandedRows] = useState({})
  const toggleRow = index => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }))
  }
  const router = useRouter()
  useEffect(() => {
    if (
      materialsQuates?.length === 0 &&
      !form.getValues('materialQuotes')?.length &&
      !editData // Check if it's an edit scenario
    ) {
      appendMaterial({
        item: '',
        description: '',
        quantity: '1',
        cost: '',
        price: 0,
        total: 0,
        uom: '',
        margin: '',
        lineType: '',
        notes: ''
      })
    }
  }, [materialsQuates, editData])

  const watchedMaterials = useWatch({
    control: form.control,
    name: 'materialQuotes'
  })?.map((item, index) => ({
    id: materialsQuates[index]?.id, // Preserve existing ID or generate new one
    ...item
  }))

  // calculate the material total and total
  const uomOptions = ['kg', 'm', 'pcs', 'box', 'liters']
  const totalSum = useMemo(() => {
    return watchedMaterials?.reduce(
      (sum, item) => sum + (Number(item?.total) || 0),
      0
    )
  }, [watchedMaterials])
  form.setValue('materialTotal', totalSum)

  useEffect(() => {
    watchedMaterials?.forEach((item, index) => {
      if (!item.item && !item.description && !item.cost && !item.margin) {
        return // Skip empty items
      }

      const cost = Number(item.cost) || 0
      const margin = Number(item.margin) || 0
      const quantity = Number(item?.quantity) || 0
      const price = cost + margin
      const total = price * quantity
      const existingItem = form.getValues(`materialQuotes.${index}`)

      if (existingItem) {
        if (form.getValues(`materialQuotes.${index}.price`) !== price) {
          form.setValue(`materialQuotes.${index}.price`, price, {
            shouldValidate: true
          })
        }
        if (form.getValues(`materialQuotes.${index}.total`) !== total) {
          form.setValue(`materialQuotes.${index}.total`, total, {
            shouldValidate: true
          })
        }
      }
    })
  }, [watchedMaterials])

  // useEffect(() => {
  //   watchedMaterials?.forEach((item, index) => {
  //     const cost = Number(item.cost) || 0
  //     const margin = Number(item.margin) || 0
  //     const quantity = Number(item?.quantity) || 0
  //     const price = cost + margin
  //     const total = price * quantity
  //     const existingItem = form.getValues(`materialQuotes.${index}`)
  //     if (existingItem) {
  //       if (form.getValues(`materialQuotes.${index}.price`) !== price) {
  //         form.setValue(`materialQuotes.${index}.price`, price, {
  //           shouldValidate: true
  //         })
  //       }
  //       if (form.getValues(`materialQuotes.${index}.total`) !== total) {
  //         form.setValue(`materialQuotes.${index}.total`, total, {
  //           shouldValidate: true
  //         })
  //       }
  //     }
  //   })
  // }, [watchedMaterials])

  // To get the description of the item

  useEffect(() => {
    watchedMaterials?.forEach((item, index) => {
      const proName = Number(item.item)

      const getDescription = productItem?.filter(item =>
        item?.variations?.some(variation => variation?.id === proName)
      )

      const descriptionFromApi = getDescription[0]?.description

      if (descriptionFromApi) {
        const tempElement = document.createElement('div')
        tempElement.innerHTML = descriptionFromApi
        const plainTextDescription =
          tempElement.textContent || tempElement.innerText || ''

        const currentFormValue = form.getValues(
          `materialQuotes.${index}.description`
        )

        if (currentFormValue !== plainTextDescription) {
          form.setValue(
            `materialQuotes.${index}.description`,
            plainTextDescription,
            {
              shouldValidate: true
            }
          )
        }
      }
    })
  }, [watchedMaterials])

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await api.get(`lead/getAllLeads`)
        if (response.status === 200) {
          setCustomer(response.data.data?.leads)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    getCustomer()
  }, [])

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await api.get(`/catalog/getAllCatalog`)
        if (response.status === 200) {
          setProductItem(response.data.data?.catalog)
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
    getItem()
  }, [])

  // Fill the ship to address by getting the customer name
  const getAddress = form.watch('customerName')
  const setAddress = customer?.filter(item => item?.id === getAddress)
  const address = setAddress?.map(item => item?.customerAddress)
  form.setValue('shipTo', address[0])
  const email = setAddress?.map(item => item?.email)
  form.setValue('customerEmail', email[0])

  const phone = setAddress?.map(item => item?.phone)
  form.setValue('customerPhone', phone[0])
  // used when the expended Field have an data
  useEffect(() => {
    const currentUnits = form.getValues('materialQuotes') || []
    setExpandedRows(prev => {
      const newOpenRows = { ...prev }
      currentUnits.forEach((unit, index) => {
        // Check if any of the required fields have data
        const hasData =
          unit.description ||
          unit.quantity ||
          unit.cost ||
          unit.price ||
          unit.total ||
          unit.uom

        newOpenRows[index] = Boolean(hasData)
      })
      return newOpenRows
    })
  }, [materialsQuates, form.getValues])

  const handleSendLink = async () => {
    try {
      const response =
        await MaterialQuotesServices?.sendMaterialQuotePdf(editId)
      if (response?.data?.status === true) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/product/material-quotes')
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const [activeTab, setActiveTab] = useState('FORM')

  const handleTabChange = value => {
    setActiveTab(value)
    localStorage.setItem('leadDashboardTab', value)
  }

  return (
    <>
      {editData ? (
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div className='flex justify-between border-none'>
            <TabsList className='dashboard-tabs grid grid-cols-4 gap-8 bg-white p-0'>
              <TabsTrigger
                value='FORM'
                className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
              >
                QUOTE
              </TabsTrigger>
              <TabsTrigger
                value='GENERAL INFORMATION'
                className='text-light-color relative !rounded-none !px-0 text-sm font-medium !shadow-transparent'
              >
                GENERAL INFORMATION
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent className='mt-0' value='FORM'>
            {/* <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
            Customer Detail
          </CardDescription> */}
            <Separator />
            <div className='flex grid-cols-2 justify-between gap-2'>
              <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
                Material Quotes
              </CardDescription>
              {editData?.status === null && (
                <Button
                  type='button'
                  onClick={handleSendLink}
                  className='site-button-small mb-3 mt-5'
                >
                  Send Material Quotes To Customer
                </Button>
              )}
            </div>
            <div className='overflow-x-auto pb-1'>
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
                      isTaxable
                    </TableHead>
                    <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                      Qty
                    </TableHead>
                    <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                      UOM
                    </TableHead>
                    <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                      Sku
                    </TableHead>
                    <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                      Total
                    </TableHead>
                    <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                      Expand
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materialsQuates.map((field, index) => (
                    <>
                      <TableRow key={field.id} className='hover:bg-gray-100'>
                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <SelectFilter
                            form={form}
                            name={`materialQuotes.${index}.item`}
                            placeholder='Item'
                            userList={createProductNameSku(productItem).map(
                              item => {
                                return {
                                  label: item.label,
                                  value: String(item.value)
                                }
                              }
                            )}
                          />
                        </TableCell>
                        <TableCell className='w-2/12 border border-gray-300 px-2 py-2'>
                          <FormInputField
                            form={form}
                            name={`materialQuotes.${index}.description`}
                            placeholder='Description'
                            type='text'
                          />
                        </TableCell>
                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <FormInputField
                            form={form}
                            name={`materialQuotes.${index}.cost`}
                            placeholder='$0'
                            type='number'
                          />
                        </TableCell>
                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <FormInputField
                            form={form}
                            name={`materialQuotes.${index}.margin`}
                            placeholder='0'
                            type='number'
                          />
                        </TableCell>
                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <FormInputField
                            form={form}
                            name={`materialQuotes.${index}.price`}
                            placeholder='$0'
                            type='number'
                            disable
                          />
                        </TableCell>

                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <FormCheckBox
                            form={form}
                            name={`materialQuotes.${index}.isTaxable`}
                            className='h-5 w-5 accent-blue-500'
                          />
                        </TableCell>

                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <FormInputField
                            form={form}
                            name={`materialQuotes.${index}.quantity`}
                            placeholder='0'
                            type='number'
                          />
                        </TableCell>
                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <FormSelectField
                            form={form}
                            name={`materialQuotes.${index}.uom`}
                            placeholder='UOM'
                            options={uomOptions.map(uom => ({
                              label: uom,
                              value: uom
                            }))}
                          />
                        </TableCell>
                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <FormInputField
                            form={form}
                            name={`materialQuotes.${index}.sku`}
                            placeholder='0'
                            type='number'
                            disable
                          />
                        </TableCell>
                        <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                          <FormInputField
                            form={form}
                            name={`materialQuotes.${index}.total`}
                            placeholder='$0'
                            type='number'
                            disable
                          />
                        </TableCell>
                        <TableCell className='text-center'>
                          <Button
                            type='button'
                            onClick={() => toggleRow(index)}
                            className='text-dark-color h-10 w-10 rounded-full !shadow-none'
                          >
                            {expandedRows[index] ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedRows[index] && (
                        <>
                          <TableRow className='bg-gray-100'>
                            <TableCell colSpan='9'>
                              <div className='grid grid-cols-3 items-center gap-4'>
                                <FormSelectField
                                  form={form}
                                  name={`materialQuotes.${index}.lineType`}
                                  placeholder='Select the line type'
                                  options={[
                                    { label: 'Material', value: 'Material' },
                                    { label: 'Labor', value: 'Labor' },
                                    {
                                      label: 'Budget Funds',
                                      value: 'Budget Funds'
                                    },
                                    { label: 'Other', value: 'Other' }
                                  ]}
                                />
                                <FormInputField
                                  form={form}
                                  name={`materialQuotes.${index}.notes`}
                                  placeholder='Notes'
                                />
                                {materialsQuates.length === 1 ? null : (
                                  <>
                                    <Button
                                      type='button'
                                      onClick={() => {
                                        if (materialsQuates.length > 1) {
                                          removeMaterial(index)
                                        }
                                      }}
                                      className='h-8 w-8 rounded-full bg-red-500 p-2 text-white'
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </>
                  ))}
                  <TableRow className='hover:bg-gray-100'>
                    <TableCell
                      className='border border-gray-300 px-2 py-2'
                      colSpan='7'
                    >
                      Additional Total
                    </TableCell>
                    <TableCell
                      className='border border-gray-300 px-2 py-2'
                      colSpan='4'
                    >
                      <FormInputField
                        name='materialTotal'
                        placeholder='$0.00'
                        disable
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Add More Button */}
              <Button
                type='button'
                onClick={() =>
                  appendMaterial({
                    item: '',
                    description: '',
                    quantity: '1', // Default to 1 instead of an empty string
                    cost: '',
                    price: 0, // Ensure price is numeric
                    total: 0, // Ensure total is numeric
                    uom: '',
                    margin: '',
                    lineType: '',
                    notes: ''
                  })
                }
                className='site-button mt-4'
              >
                + Add More
              </Button>
            </div>
            <div>
              <FormInputField
                form={form}
                name='addtaxable'
                placeholder='Enter Taxable'
                label='Taxable'
              />
            </div>{' '}
          </TabsContent>
          <TabsContent className='mt-0' value='GENERAL INFORMATION'>
            <div className='grid grid-cols-1 gap-4'>
              <div>
                <CardDescription className='text-black-900 text-l mb-3 mt-5 font-semibold'>
                  Customer Name
                </CardDescription>
                {editData.customerName}
              </div>
              <div>
                <CardDescription className='text-black-900 text-l mb-3 mt-5 font-semibold'>
                  Ship To
                </CardDescription>
                {editData.shipTo}
              </div>
              <div>
                <CardDescription className='text-black-900 text-l mb-3 mt-5 font-semibold'>
                  Salesperson
                </CardDescription>
                ????
              </div>
              <div>
                <CardDescription className='text-black-900 text-l mb-3 mt-5 font-semibold'>
                  Tax Jurisdiction
                </CardDescription>
                ????{' '}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
            Customer Detail
          </CardDescription>
          <div className='grid grid-cols-2 gap-4'>
            <SelectFilter
              form={form}
              name='customerName'
              label='Customer Name'
              placeholder='Select Customer'
              userList={customer?.map(item => {
                return {
                  label: item.firstName,
                  value: item.id,
                  tag: item.customerAddress
                }
              })}
            />

            <FormInputField form={form} name='shipTo' label='Ship To' disable />
          </div>
          <Separator />
          <div className='flex grid-cols-2 justify-between gap-2'>
            <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
              Material Quotes
            </CardDescription>
            {editData?.status === null && (
              <Button
                type='button'
                onClick={handleSendLink}
                className='site-button-small mb-3 mt-5'
              >
                Send Material Quotes To Customer
              </Button>
            )}
          </div>
          <div className='overflow-x-auto pb-1'>
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
                    isTaxable
                  </TableHead>
                  <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                    Qty
                  </TableHead>
                  <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                    UOM
                  </TableHead>
                  <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                    Sku
                  </TableHead>
                  <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                    Total
                  </TableHead>
                  <TableHead className='w-1/12 border border-gray-100 px-4 py-2 text-left'>
                    Expand
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materialsQuates.map((field, index) => (
                  <>
                    <TableRow key={field.id} className='hover:bg-gray-100'>
                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <SelectFilter
                          form={form}
                          name={`materialQuotes.${index}.item`}
                          placeholder='Item'
                          userList={createProductNameSku(productItem).map(
                            item => {
                              return {
                                label: item.label,
                                value: String(item.value)
                              }
                            }
                          )}
                        />
                      </TableCell>
                      <TableCell className='w-2/12 border border-gray-300 px-2 py-2'>
                        <FormInputField
                          form={form}
                          name={`materialQuotes.${index}.description`}
                          placeholder='Description'
                          type='text'
                        />
                      </TableCell>
                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <FormInputField
                          form={form}
                          name={`materialQuotes.${index}.cost`}
                          placeholder='$0'
                          type='number'
                        />
                      </TableCell>
                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <FormInputField
                          form={form}
                          name={`materialQuotes.${index}.margin`}
                          placeholder='0'
                          type='number'
                        />
                      </TableCell>
                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <FormInputField
                          form={form}
                          name={`materialQuotes.${index}.price`}
                          placeholder='$0'
                          type='number'
                          disable
                        />
                      </TableCell>

                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <FormCheckBox
                          form={form}
                          name={`materialQuotes.${index}.isTaxable`}
                          className='h-5 w-5 accent-blue-500'
                        />
                      </TableCell>

                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <FormInputField
                          form={form}
                          name={`materialQuotes.${index}.quantity`}
                          placeholder='0'
                          type='number'
                        />
                      </TableCell>
                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <FormSelectField
                          form={form}
                          name={`materialQuotes.${index}.uom`}
                          placeholder='UOM'
                          options={uomOptions.map(uom => ({
                            label: uom,
                            value: uom
                          }))}
                        />
                      </TableCell>
                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <FormInputField
                          form={form}
                          name={`materialQuotes.${index}.sku`}
                          placeholder='0'
                          type='number'
                          disable
                        />
                      </TableCell>
                      <TableCell className='w-1/12 border border-gray-300 px-2 py-2'>
                        <FormInputField
                          form={form}
                          name={`materialQuotes.${index}.total`}
                          placeholder='$0'
                          type='number'
                          disable
                        />
                      </TableCell>
                      <TableCell className='text-center'>
                        <Button
                          type='button'
                          onClick={() => toggleRow(index)}
                          className='text-dark-color h-10 w-10 rounded-full !shadow-none'
                        >
                          {expandedRows[index] ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedRows[index] && (
                      <>
                        <TableRow className='bg-gray-100'>
                          <TableCell colSpan='9'>
                            <div className='grid grid-cols-3 items-center gap-4'>
                              <FormSelectField
                                form={form}
                                name={`materialQuotes.${index}.lineType`}
                                placeholder='Select the line type'
                                options={[
                                  { label: 'Material', value: 'Material' },
                                  { label: 'Labor', value: 'Labor' },
                                  {
                                    label: 'Budget Funds',
                                    value: 'Budget Funds'
                                  },
                                  { label: 'Other', value: 'Other' }
                                ]}
                              />
                              <FormInputField
                                form={form}
                                name={`materialQuotes.${index}.notes`}
                                placeholder='Notes'
                              />
                              {materialsQuates.length === 1 ? null : (
                                <>
                                  <Button
                                    type='button'
                                    onClick={() => {
                                      if (materialsQuates.length > 1) {
                                        removeMaterial(index)
                                      }
                                    }}
                                    className='h-8 w-8 rounded-full bg-red-500 p-2 text-white'
                                  >
                                    <Trash size={16} />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </>
                ))}
                <TableRow className='hover:bg-gray-100'>
                  <TableCell
                    className='border border-gray-300 px-2 py-2'
                    colSpan='7'
                  >
                    Additional Total
                  </TableCell>
                  <TableCell
                    className='border border-gray-300 px-2 py-2'
                    colSpan='4'
                  >
                    <FormInputField
                      name='materialTotal'
                      placeholder='$0.00'
                      disable
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Add More Button */}
            <Button
              type='button'
              onClick={() =>
                appendMaterial({
                  item: '',
                  description: '',
                  quantity: '1', // Default to 1 instead of an empty string
                  cost: '',
                  price: 0, // Ensure price is numeric
                  total: 0, // Ensure total is numeric
                  uom: '',
                  margin: '',
                  lineType: '',
                  notes: ''
                })
              }
              className='site-button mt-4'
            >
              + Add More
            </Button>
          </div>
          <div>
            <FormInputField
              form={form}
              name='addtaxable'
              placeholder='Enter Taxable'
              label='Taxable'
            />
          </div>
          <Separator />
        </>
      )}
    </>
  )
}

export default AddFields
