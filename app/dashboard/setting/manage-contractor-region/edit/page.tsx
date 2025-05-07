'use client'
import LayoutHeader from '@/components/layoutHeader'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Tag, TagInput } from 'emblor'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditContractorRegion = () => {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
  const [loading, setLoading] = useState(false)
  const [exampleTags, setExampleTags] = useState<Tag[]>([])
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  const router = useRouter()
  const [editData, setEditData] = useState(null)
  const form = useForm()
  useEffect(() => {
    if (editData?.associateZipCode) {
      const formattedTags = editData.associateZipCode.map((zip: string) => ({
        id: `${crypto.randomUUID()}`,
        text: zip
      }))
      setExampleTags(formattedTags)
    }
  }, [editData])
  // Fetch contract data only if editId is valid
  useEffect(() => {
    if (!editId) return

    const fetchContractById = async () => {
      setLoading(true) // Set loading to true before API call
      try {
        const getContractRegion = await api.get(
          `contract/contractRegionById?regionId=${editId}`
        )
        if (getContractRegion?.status === 200) {
          if (!getContractRegion.data.data) {
            throw new Error('No contract found with the provided ID.')
          }

          setEditData(getContractRegion.data.data)
          form.reset({
            contractorAddress:
              getContractRegion.data.data.contractorAddress || '',
            ...getContractRegion.data.data
          })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
        router.replace('/dashboard/contract')
      } finally {
        setLoading(false) // Reset loading state after API call
      }
    }

    fetchContractById()
  }, [editId]) // Run effect only when `editId` changes

  const onSubmitRegion = async (data: any) => {
    setLoading(true) // Set loading to true when submitting
    const extractedTexts = exampleTags.map(tag => tag.text)

    const newdata = {
      regionName: data.regionName,
      associateZipCode: extractedTexts
    }

    try {
      await api.put(`contract/contractRegionUpdate?regionId=${editId}`, newdata)
      toast({
        title: 'Contract Region & Zip Code',
        description: 'Successfully Updated.'
      })
      router.replace('/dashboard/setting/manage-contractor-region')
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Something went wrong.'
      })
    } finally {
      setLoading(false) // Reset loading state after submission
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='Edit Sub Contractor Region' />
        <Button
          className='site-button'
          onClick={() =>
            router.push(`/dashboard/setting/manage-contractor-region`)
          }
        >
          All Sub Contractor Region
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitRegion)} className=''>
          <FormInputField
            form={form}
            name='regionName'
            label='Contractor Region Name'
            placeholder='Enter Region Name'
            type='text'
          />

          <div className='zip-code-field mt-5'>
            <Label>Associate Zip Code</Label>
            <TagInput
              tags={exampleTags}
              setTags={setExampleTags}
              placeholder='Enter Associate Zip Code'
              styleClasses={{
                input: 'w-full sm:max-w-[350px]'
              }}
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
            />
          </div>

          <div className='mt-5 flex justify-end'>
            <Button type='submit' className='site-button' disabled={loading}>
              {loading ? (
                <Spinner size='lg' className='m-auto bg-black dark:bg-white' />
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
export default EditContractorRegion
