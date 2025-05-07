'use client'
import { AllSubContractorRegionValidation } from '@/components/form-validations/AllSubContractorRegionValidation'
import LayoutHeader from '@/components/layoutHeader'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import api from '@/lib/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { Tag, TagInput } from 'emblor'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ManageRegion = () => {
  const [loading, setLoading] = useState(false)
  const [exampleTags, setExampleTags] = useState<Tag[]>([])
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const form = useForm({
    resolver: yupResolver(AllSubContractorRegionValidation)
  })
  const router = useRouter()
  const onSubmitRegion = async data => {
    const extractedTexts = exampleTags.map(tag => tag.text)

    const newdata = {
      regionName: data.regionName,
      associateZipCode: extractedTexts
    }
    try {
      const response = await api.post(`contract/addContractRegion`, newdata)
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        router.replace('/dashboard/setting/manage-contractor-region')
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
    setLoading(true)
  }

  // const region = form.watch('contractorRegion')

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='Add Sub Contractor Region' />
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
            // errors={form.formState.errors}
          />

          <div className='zip-code-field mt-6'>
            <Label className='!mb-3 block'> Associate Zip Code</Label>
            <TagInput
              tags={exampleTags}
              setTags={newTags => {
                setExampleTags(newTags)
              }}
              placeholder='Enter Associate Zip Code'
              styleClasses={{
                input: 'w-full sm:max-w-[350px]'
              }}
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
            />
          </div>

          <div className='mt-5 flex justify-end'>
            {loading ? (
              <Button>
                <Spinner size='lg' className='m-auto bg-black dark:bg-white' />
              </Button>
            ) : (
              <Button type='submit' className='site-button'>
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

export default ManageRegion
