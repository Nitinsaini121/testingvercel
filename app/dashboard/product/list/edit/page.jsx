'use client'
import { generateCombinations } from '@/components/ProductForm/VariationGenrate'
import { hasValidationIssues } from '@/components/ProductForm/VariationValidationCheck'
import EditProductFields from '@/components/ProductForm/editProductForm/EditProduct'
import { errorMessage } from '@/components/ToasterMessage'
import { ProductValidationSchema } from '@/components/form-validations/products-validation'
import LayoutHeader from '@/components/layoutHeader'
import CatalogServices from '@/components/services/catalog-api'
import ProductCatogriesServices from '@/components/services/catogries-api'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { toast } from '@/hooks/use-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditProduct = () => {
  const form = useForm({ resolver: yupResolver(ProductValidationSchema) })
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [editData, setEditData] = useState([])
  const [catogriesList, setCatogriesList] = useState([])
  const [newAttributes, setNewAttributes] = useState([])
  const [atributesNew, setAtributesNew] = useState([])
  const [atributeFields, setAtributeFields] = useState([])
  const [skuDuplicate, setSkuDuplicate] = useState(false)
  const [missingPrice, setMissingPrice] = useState(false)
  const [duplicateVari, setDuplicateVari] = useState(false)
  const [attribute, setAttribute] = useState([])
  const [missingSku, setMissingSku] = useState(false)
  const [VariationFieldData, setVariationFieldData] = useState([])
  const [ifDelete, setIfDelete] = useState('')
  const [changedAttri, setChangedAttri] = useState(null)

  useDocumentTitle('Edit Product')

  const variationIndexRef = useRef(0)

  // Get Catalog Data by ID :----
  useEffect(() => {
    const fetchCatalog = async () => {
      const catalog = await CatalogServices?.getCatalogById(editId)
      setEditData(catalog?.data?.data)
      setVariationFieldData(catalog?.data?.data?.variations)
      setAtributeFields(catalog?.data?.data?.attributes[0]?.attributeData)
      localStorage.setItem(
        'oldAtributeData',
        JSON.stringify(catalog?.data?.data?.attributes[0]?.attributeData)
      )
      setAttribute(catalog?.data?.data?.attributes[0]?.attributeData)
    }

    fetchCatalog()
  }, [editId])

  // Get all categories:---
  const getCategories = async () => {
    try {
      const response = await ProductCatogriesServices.getCategory()
      if (response.status === 200) {
        setCatogriesList(response?.data?.data?.productCategory)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (editData) {
      form.reset({
        ...editData,
        variations: editData?.variations?.map(item => item?.data) || [],
        keySpecifications: editData.keySpecifications || [],
        category: editData.category || ''
      })
    }
  }, [editData, form])

  //final atribute after update :-
  let uniqueNames = []
  const combinedArray = [...atributeFields, ...atributesNew]

  for (let i = 0; i < combinedArray.length; i++) {
    const currentName = combinedArray[i].name
    const currentValue = combinedArray[i].value

    const nameExists = uniqueNames.some(item => item.name === currentName)

    if (!nameExists) {
      // Prefer value from atributesNew if it exists
      let valueFromNew = atributesNew?.find(
        item => item.name === currentName
      )?.value
      let data = {
        name: currentName,
        value: valueFromNew !== undefined ? valueFromNew : currentValue
      }
      uniqueNames.push(data)
    }
  }


  useEffect(() => {
    const variationData = JSON.parse(localStorage.getItem('variations')) || []
    if (uniqueNames?.length && variationData == 0 && ifDelete != 'isDeleted') {
      const formattedCombinations = generateCombinations(uniqueNames, 'any')
      const onlyGetByIdVariationsField = []
      for (let i = 0; i < VariationFieldData.length; i++) {
        onlyGetByIdVariationsField.push(formattedCombinations[i])
      }
      for (let index = 0; index < onlyGetByIdVariationsField.length; index++) {
        variationIndexRef.current += 1
      }
      localStorage.setItem(
        'variations',
        JSON.stringify(onlyGetByIdVariationsField)
      )
    }
  }, [atributesNew.length, uniqueNames])

  // Update Catalog handler :-----

  const onEditCatalog = async data => {
    if (form?.formState?.errors?.variations?.length) {
      return errorMessage({
        description: 'Variation Error!'
      })
    }
    if (changedAttri) {
      return errorMessage({
        description: 'Please Save Attributes.'
      })
    }

    if (duplicateVari) {
      return errorMessage({
        description: 'Duplicate variation value.'
      })
    }
    // skuDuplicate
    if (skuDuplicate) {
      return errorMessage({
        description: 'SKU value is Duplicate.'
      })
    }

    try {
      if (!editId) {
        console.error('Error: Missing editId')
        return
      }

      const formData = new FormData()
      setLoading(true)
      // Append simple form fields :)
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          return // Skip objects for now
        }
        formData.append(key, data[key])
      })
      // Handle variations (array of objects)
      if (data.variations) {
        data.variations.forEach((variation, index) => {
          if (variation.featureImage?.[0]) {
            formData.append(`featureImage`, variation.featureImage[0])
          }
          if (variation.thumbnail?.[0]) {
            formData.append(`thumbnail`, variation.thumbnail[0])
          }
        })
        formData.append('variations', JSON.stringify(data.variations))
      }

      // Append attribute data for Edit use :-
      if (atributeFields) {
        formData.append(
          'attribute',
          JSON.stringify(atributesNew.length ? atributesNew : uniqueNames)
        )
      }
      // Append keySpecifications
      if (data.keySpecifications) {
        formData.append(
          'keySpecifications',
          JSON.stringify(data.keySpecifications)
        )
      }
      // Append catalogId explicitly if required
      formData.append('catalogId', editId)
      const response = await CatalogServices.updateCatalog(editId, formData)
      form.reset()
      router.push('/dashboard/product/list')
      toast({
        title: 'Catalog Edit',
        description: 'Catalog Edit Successfully'
      })
    } catch (error) {
      console.log('error', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.response?.data?.message
      })
      setLoading(false)
    } finally {
      setLoading(false)
      // form.reset()
    }
  }

  const onSaveAttribute = data => {
    setAtributeFields(data?.attributes)
    setAtributesNew(data?.attributes)
    setAttribute(data?.attributes)
    variationIndexRef.current = 0
    setChangedAttri(false)
    localStorage.removeItem('variations')
  }

  // Duplicate variation value :)
  const varData = form.watch('variations')

  const result = hasValidationIssues(varData)

  useEffect(() => {
    if (result) {
      setDuplicateVari(result.duplicate)
      setSkuDuplicate(result.skuDuplicate)
      setMissingPrice(result.missingPrice)
      setMissingSku(result.missingSku)
    }
  }, [result, varData])

  useEffect(() => {
    return () => {
      localStorage.removeItem('variations')
      localStorage.removeItem('oldAtributeData')
      localStorage.removeItem('attributeChanged')
    }
  }, [])
  return (
    <>
      <LayoutHeader pageTitle={'Edit Product'} />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onEditCatalog)}>
          <EditProductFields
            form={form}
            newAttributes={newAttributes}
            onSaveAttribute={onSaveAttribute}
            attribute={attribute}
            duplicateVari={duplicateVari}
            skuDuplicate={skuDuplicate}
            missingPrice={missingPrice}
            missingSku={missingSku}
            setIfDelete={setIfDelete}
            variationIndexRef={variationIndexRef}
            setChangedAttri={setChangedAttri}
            changedAttri={changedAttri}
          />
          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button className='h-10 w-40'>
                <Spinner size='sm' className='m-auto bg-black dark:bg-white' />
              </Button>
            ) : (
              <Button type='submit' className='site-button'>
                Update Product
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

export default EditProduct
