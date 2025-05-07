'use client'
import { Contractor } from '@/types/contractor-type'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import AddressLocation from '../address-location/address-location'
import { GOOGLE_MAPS_API_KEY } from '../leadLocation'
import FormDatePicker from '../share/form/datePicker'
import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import FormSelectField from '../share/form/FormSelect'
import RadioButton from '../share/form/RadioButton'
import { SliderDemo } from '../slider'
import { CardDescription } from '../ui/card'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { errorMessage } from '../ToasterMessage'

type ContractorFormFieldsProps = {
  getRegions: string[]
  form: UseFormReturn<Contractor>
  owensCoringCertification: string
  setOwensCoringCertification: Dispatch<SetStateAction<string>>
  certainTeedCertification: string
  setCertainTeedCertification: Dispatch<SetStateAction<string>>
  gafCertification: string
  setGafCertification: Dispatch<SetStateAction<string>>
  editData?: Contractor | null
}

const ContractorFormFields = ({
  getRegions,
  form,
  owensCoringCertification,
  setOwensCoringCertification,
  certainTeedCertification,
  setCertainTeedCertification,
  gafCertification,
  setGafCertification,
  editData
}: ContractorFormFieldsProps) => {
  const [contractorRegion, setContractorRegion] = useState<string[]>([])
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  useEffect(() => {
    const zipCode = form.watch('regionalZipCode')

    if (zipCode && zipCode.length >= 5) {
      fetchRegionByZip(zipCode)
    } else {
      form.setValue('contractorRegion', '')
    }
  }, [form.watch('regionalZipCode')])

  // static data form GAFCertificateData
  const GAFCertificateData = [
    {
      value: 'Presidents club  Award',
      label: 'Presidents Club Award'
    },
    { value: 'Master Elite', label: 'Master Elite' },
    { value: 'Certified', label: 'Certified' }
  ]

  // static data form CertinteedCertificateData
  const CertinteedCertificateData = [
    {
      value: 'Platinum Preferred Contractor',
      label: 'Platinum Preferred Contractor'
    },
    { value: 'PreferredContractor', label: 'Preferred Contractor' }
  ]

  //  static data form CertinteedCertificateData
  const OwensCoringCertification = [
    {
      value: 'Shingle Master(SM)',
      label: 'ShingleMaster (SM)'
    },
    { value: 'Select Shingle Master(SSM)', label: 'SelectShingleMaster (SSM)' }
  ]

  // Handler for fetching region by ZIP
  const fetchRegionByZip = async (zipCode: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${GOOGLE_MAPS_API_KEY}`
      )
      const data = await response.json()
      if (data.status === 'OK' && data.results.length > 0) {
        const addressComponents = data.results[0].address_components

        const stateComponent = addressComponents.find(
          (component: { types: string[]; long_name: string }) =>
            component.types.includes('administrative_area_level_1')
        )

        const districtComponent = addressComponents.find(
          (component: { types: string[]; long_name: string }) =>
            component.types.includes('administrative_area_level_2')
        )

        const state = stateComponent ? stateComponent.long_name : ''
        const district = districtComponent ? districtComponent.long_name : ''

        const region = `${district}, ${state}`

        setContractorRegion([region])

        form.setValue('contractorRegion', region)
      }
    }    catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <>
      <div>
        <CardDescription className='mb-2 mt-5 text-xl'></CardDescription>
        <div className='mb-3 mt-5 grid grid-cols-2 gap-4'>
          <FormInputField
            form={form}
            name='contractorName'
            label='Name *'
            placeholder='Enter Contractor Name'
            type='text'
          />
          <FormInputField
            form={form}
            name='contractorPhone'
            label='Phone *'
            placeholder='Enter Contractor Phone'
            type='text'
          />
          {editData ? (
            <div className='file-upload flex justify-between'>
              <FileUpload
                form={form}
                name='logo'
                label='Logo *'
                className='h-12 py-3 rounded !shadow-none border border-color-grey '
              />{' '}
              <Label>&nbsp;</Label>
              <img
                src={editData?.logo}
                alt='Contractor Logo'
                width={100}
                height={50}
              />
            </div>
          ) : (
            <FileUpload
              form={form}
              name='logo'
              label='Logo *'
              className='h-12 py-3 rounded border-color-grey !shadow-none'
              
            />
          )}

          <FormInputField
            form={form}
            name='contractorEmail'
            label='Email *'
            placeholder='Enter Contractor Email'
            type='text'
          />
        </div>
        <div className='mb-4 flex flex-col gap-4'>
          <AddressLocation
            form={form}
            name='Search Location'
            placeholder='Enter location'
            label='Search Location'
            type='text'
            nameAddress='contractorAddress'
            nameState='contractorState'
            nameCity='contractorCity'
            nameZip='contractorZip'
            placeholderAddress='Enter Contractor Address'
            placeholderCity='Enter Contractor City'
            placeholderState='Enter Contractor State'
            placeholderZip='Enter Contractor Zip'
            setLatitudde={setLatitude}
            setLongitudde={setLongitude}
          />
        </div>

        <div>
          <CardDescription className='mt-7 text-lg font-semibold text-dark-color pb-2'>
            Certification
          </CardDescription>
          <Separator className='bg-light-grey h-px'/>

          <div className='mt-4'>
            <div className='flex items-center gap-3'>
              <div className='custom-shadow h-10 w-10 overflow-hidden rounded-full'>
                <img
                  src='/images/GAF_logo.svg.webp'
                  className='h-10 w-10 max-w-10'
                />
              </div>
              <span className='text-md font-medium'>GAF Certification</span>
            </div>
            <div className='pl-2'>
              <RadioButton
                name='gaf'
                form={form}
                label=''
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' }
                ]}
                onChange={(value: string) => {
                  setGafCertification(value)
                }}
              />
            </div>

            {gafCertification === 'true' && (
              <div className='mb-3 grid grid-cols-3 gap-3'>
                <FormMultiSelectField
                  form={form}
                  name='gafCertifications'
                  label='GAF Certification'
                  placeholder='Enter Gaf Certification'
                  options={GAFCertificateData}
                />
                <FormInputField
                  form={form}
                  name='gafRating'
                  label='GAF Rating'
                  placeholder='Enter GAF Rating'
                  type='text'
                />
                <FormInputField
                  form={form}
                  name='gafReviews'
                  label='GAF Reviews'
                  placeholder='Enter Gaf Reviews'
                  type='text'
                />
              </div>
            )}
            <div className='flex items-center gap-3'>
              <div className='custom-shadow h-10 w-10 overflow-hidden rounded-full'>
                <img src='/images/Certainteed-Logo.jpg' className='h-10 w-10' />
              </div>
              <label className='text-md font-medium'>
                Certinteed Certification
              </label>
            </div>
            <div className='flex-nowrap pl-2'>
              <RadioButton
                name='certineed'
                form={form}
                label=''
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' }
                ]}
                onChange={(value: string) => {
                  form.setValue('certineed', value)
                  setCertainTeedCertification(value)
                }}
              />
            </div>
            {certainTeedCertification === 'true' && (
              <div className='grid grid-cols-3 gap-3'>
                <FormMultiSelectField
                  form={form}
                  name='certineedCertifications'
                  label='Certinteed Certification'
                  placeholder='Enter certinteed Certification'
                  options={CertinteedCertificateData}
                />
                <FormInputField
                  form={form}
                  name='certineedRating'
                  label='Certinteed Rating'
                  placeholder='Enter certinteed Rating'
                  type='text'
                />
                <FormInputField
                  form={form}
                  name='certineedReviews'
                  label='Certinteed Reviews'
                  placeholder='Enter Certinteed Reviews'
                  type='text'
                />
              </div>
            )}
            <div className='flex items-center gap-3'>
              <div className='custom-shadow h-10 w-10 overflow-hidden rounded-full'>
                <img
                  src='/images/Owens_Corning_logo.svg.png'
                  className='h-10 w-10'
                />
              </div>
              <label className='text-md font-medium'>
                Owens Coring Certification
              </label>
              <div className='h-12 w-12 overflow-hidden rounded-full'></div>
            </div>
            <div className='pl-2'>
              <RadioButton
                name='owensCoring'
                form={form}
                label=''
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' }
                ]}
                // onChange={setOwensCoringCertification}
                onChange={(value: string) => setOwensCoringCertification(value)}
              />
            </div>
            {owensCoringCertification === 'true' && (
              <div className='grid grid-cols-3 gap-3'>
                <FormMultiSelectField
                  form={form}
                  name='owensCoringCertifications'
                  label='Owens Coring Certification'
                  placeholder='Enter certinteed Certification'
                  options={OwensCoringCertification}
                />
                <FormInputField
                  form={form}
                  name='owensCoringRating'
                  label='Owens Coring Rating'
                  placeholder='Enter certinteed Rating'
                  type='text'
                />
                <FormInputField
                  form={form}
                  name='owensCoringReviews'
                  label='Owens Coring Reviews'
                  placeholder='Enter Certinteed Reviews'
                  type='text'
                />
              </div>
            )}
          </div>
          <div className='mt-5 grid grid-cols-2 gap-4'>
            <FormMultiSelectField
              form={form}
              name='contractorRegion'
              label='Contractor Region'
              placeholder='Enter Contractor Region'
              options={
                Array.isArray(getRegions)
                  ? getRegions.map((region: any) => ({
                      label: region.regionName,
                      value: region.regionName
                    }))
                  : []
              }
            />
            <SliderDemo form={form} name='leadScore' label='Leads Score' />
            <FormInputField
              form={form}
              name='leadCompleteScore'
              label='Lead Complete Score'
              placeholder='Enter Lead complete score'
              type='number'
            />
            <FormInputField
              form={form}
              name='leadSource'
              label='Leads Source'
              placeholder='Enter Lead Source'
              type='text'
            />
          </div>
          <div className='my-4 grid grid-cols-2 gap-4'>
            <FormDatePicker
              name='qualifiedContractorFormStarted'
              form={form}
              label='Qualified Contractor Form started *'
              disabled={date =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
            <FormDatePicker
              name='qualifiedContractorFormSubmitted'
              form={form}
              label='Qualified Contractor Form submitted *'
              disabled={date =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
          </div>
          {editData ? (
            <div className='grid grid-cols-2 gap-4'>
              <FormDatePicker
                name='qualifiedContractorFormApproove'
                form={form}
                label='Qualified Contractor Form approved *'
                disabled={date =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
              <FormSelectField
                form={form}
                name='status'
                label='Status'
                options={[
                  { label: 'New', value: 'new' },
                  { label: 'Hot', value: 'Hot' },
                  { label: 'In Discussion', value: 'In Discussion' },
                  { label: 'Converted', value: 'Converted' }
                ]}
              />
            </div>
          ) : (
            <FormDatePicker
              name='qualifiedContractorFormApproove'
              form={form}
              label='Qualified Contractor Form approved *'
              disabled={date =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ContractorFormFields
