'use client'
import { useUnsavedChangesWarning } from '@/app/utils/useUnsavedFormWarning'
import AddProductFields from '@/components/ProductForm/AddProduct'
import { hasValidationIssues } from '@/components/ProductForm/VariationValidationCheck'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { ProductValidationSchema } from '@/components/form-validations/products-validation'
import LayoutHeader from '@/components/layoutHeader'
import AttributeServices from '@/components/services/attribute-api'
import CatalogServices from '@/components/services/catalog-api'
import ProductAttributeServices from '@/components/services/productAttribute-api'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

const AddProduct = () => {
  useDocumentTitle('Add Product')
  const [productIds, setProductId] = useState()
  const [attribute, setAttribute] = useState([])
  const [allAttributeList, setAllAttributeList] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [skuDuplicate, setSkuDuplicate] = useState(false)
  const [missingPrice, setMissingPrice] = useState(false)
  const [duplicateVari, setDuplicateVari] = useState(false)
  const [missingSku, setMissingSku] = useState(false)
  const [changedAttri, setChnagedAttri] = useState(null)
  const variationIndexRef = useRef(0)
  const [chnagedAttriLoad, setChangedAttriLoad] = useState(null)

  // useForm Hook : ----------------
  const form = useForm({
    defaultValues: {
      productName: '',
      grade: '',
      type: 'Asphalt Shingle',
      warranty: '',
      features: 'Designer Style',
      category: '',
      price: '',
      keySpecifications: [{ title: '', value: '', description: '' }],
      ...(productIds !== undefined ? { CatalogId: productIds } : {}),
      manufacturer: 'Sint recusandae Con',
      variations: [
        {
          featureImage: '',
          thumbnail: '',
          name: '',
          cost: '',
          variationId: null
        }
      ]
    },
    resolver: yupResolver(ProductValidationSchema)
  })

  const router = useRouter()

  // Form Submit handler ;---
  const onSubmitProduct = async data => {

    // if(form?.formState?.errors?.variations?.length){
    //   return errorMessage({
    //     description: 'Variation Error!'
    //   })
    // }

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
    // if (missingPrice) {
    //   return errorMessage({
    //     description: 'Price value is empty.'
    //   })
    // }
    // // missingSku
    // if (missingSku) {
    //   return errorMessage({
    //     description: 'SKU value is empty.'
    //   })
    // }

    try {
      setFormSubmitted(true) // Set form submitted state to true
      setLoading(true)
      const formData = new FormData()
      // Append simple form fields
      Object.keys(data).forEach(key => {
        if (typeof data[key] !== 'object' || data[key] === null) {
          formData.append(key, data[key])
        }
      })

      // Append keySpecifications as JSON
      if (data.keySpecifications) {
        formData.append(
          'keySpecifications',
          JSON.stringify(data.keySpecifications)
        )
      }

      // Append attribute data for Edit use :-
      if (attribute) {
        formData.append('attribute', JSON.stringify(attribute))
      }

      // Append variations data, including images
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

      // Call API to create the product
      const response = await CatalogServices.catalogAddApi(formData)
      if (response?.status === 200) {
        const productId = response?.data?.data?.id
        setProductId(productId)

        if (!productId) throw new Error('Failed to create product')
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/product/list')
        form.reset()
        return productId
      }
    } catch (error) {
      errorMessage({
        description: 'Category ID is required.'
      })
    } finally {
      setLoading(false)
      setFormSubmitted(false)
    }
  }

  // Get attribute : -
  const getAttribute = async () => {
    try {
      await AttributeServices.getAllAttributes()
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  // get List of attributes
  const getListAttributes = async () => {
    try {
      const response = await ProductAttributeServices.getAllProductAttributes()
      if (response.status === 200) {
        setAllAttributeList(response?.data?.data?.productAttributes)
      }
    } catch (error) {
      errorMessage({ description: error?.response?.data?.message })
    }
  }

  // Save attribute handler : ----
  const onSaveAttribute = async data => {
    try {
      setAttribute(data?.attributes)
      variationIndexRef.current = 0
      setChnagedAttri(false)
      localStorage.removeItem('variations')
      setChangedAttriLoad(null)
    } catch (error) {
      console.log('error', error)
    }
    getListAttributes()
  }

  // Clear localStorage :-
  useEffect(() => {
    localStorage.removeItem('variations')
    localStorage.removeItem('oldAtributeData')
    getListAttributes()
    getAttribute()
    return () => {
      localStorage.removeItem('variations')
      localStorage.removeItem('attributeChanged')
    }
  }, [])

  //Confirmation alert :-
  useUnsavedChangesWarning(formSubmitted, form.watch, form.formState.isDirty)

  // Duplicate variation value :)
  // const varData = form.watch('variations')
  const varData = useWatch({
    control: form.control,
    name: 'variations'
  })

  const result = hasValidationIssues(varData)


  useEffect(() => {
    if (result) {
      setDuplicateVari(result.duplicate)
      setSkuDuplicate(result.skuDuplicate)
      setMissingPrice(result.missingPrice)
      setMissingSku(result.missingSku)
    }
  }, [result, varData])

  return (
    <>
      <LayoutHeader pageTitle={'Add Product'} />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitProduct)}>
          <AddProductFields
            allAttributeList={allAttributeList}
            getListAttributes={getListAttributes}
            form={form}
            onSaveAttribute={onSaveAttribute}
            attribute={attribute}
            duplicateVari={duplicateVari}
            skuDuplicate={skuDuplicate}
            missingPrice={missingPrice}
            missingSku={missingSku}
            variationIndexRef={variationIndexRef}
            setChnagedAttri={setChnagedAttri}
            changedAttri={changedAttri}
            chnagedAttriLoad={chnagedAttriLoad}
            setChangedAttriLoad={setChangedAttriLoad}
            result={result}
          />
          <Separator />
          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button className='h-10 w-40'>
                <Spinner size='sm' className='m-auto bg-black dark:bg-white' />
              </Button>
            ) : (
              <Button type='submit' className='site-button'>
                Submit Product
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

export default AddProduct
