import { Dispatch, SetStateAction, useState } from 'react'

import AddressLocation from '../address-location/address-location'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import FormSelectField from '../share/form/FormSelect'
import RadioButtonForWorkOrder from '../share/form/RadioButtonForWorkOrder'
import { Separator } from '../ui/separator'
import { UserAddress } from './AddWorkOrder'
import { MultiImageUploader } from './DragDroInput'
import TextEditor from './TextEditor'

export type LeadsFormFieldsProps = {
  form: any
  setLatitudde: React.Dispatch<React.SetStateAction<string | null>>
  setLongitudde: React.Dispatch<React.SetStateAction<string | null>>
  setUserAddress: Dispatch<SetStateAction<UserAddress | undefined>>
  setImageUpload: Dispatch<SetStateAction<File[] | null>>
  disabled: boolean
  longitude: string | null
  latitude: string | null
  updateImage: number[]
  editId: any
  regionError: any
  getAllCategory: any
}

const WorkOrderFormField = ({
  form,
  editId,
  setImageUpload,
  regionError,
  longitude,
  latitude,
  updateImage,
  setLatitudde,
  setLongitudde,
  getAllCategory
}: LeadsFormFieldsProps) => {
  const [owensCoringCertification, setOwensCoringCertification] = useState('')

  return (
    <>
      <div>
        <Separator />

        <div className='my-5'>
          <RadioButtonForWorkOrder
            name='offerBox'
            form={form}
            options={[
              {
                label: 'Allow Offers',
                value: 'allow_offers',
                icon: <span>✏️</span>
              },
              {
                label: 'Instant Book',
                value: 'instant_book',
                icon: <span>⚡</span>
              },
              {
                label: 'Firm On Price',
                value: 'firm_price',
                icon: <span>🚫</span>
              }
            ]}
            onChange={value => {
              setOwensCoringCertification(value)
            }}
          />
        </div>

        <AddressLocation
          form={form}
          name='Search Location'
          placeholder='Enter location'
          label='Search Location'
          type='text'
          nameAddress='address'
          nameState='state'
          nameCity='city'
          nameZip='zip'
          placeholderAddress='Enter Address'
          placeholderCity='Enter City'
          placeholderState='Enter State'
          placeholderZip='Enter Zip'
          setLatitudde={setLatitudde}
          setLongitudde={setLongitudde}
        />
        <div className='mt-5 grid grid-cols-1'>
          <FormInputField
            form={form}
            name='region'
            label='Region'
            placeholder={
              regionError !== null ? ' Region Not Found ' : 'You Region'
            }
            type='text'
            disable={true}
          />
        </div>
        {editId && (
          <div className='mt-5 grid grid-cols-1 gap-4'>
            <FormInputField
              form={form}
              name='title'
              label='Title'
              placeholder='Enter title'
              type='text'
              disable={true}
            />
          </div>
        )}

        <div className='mt-5'>
          <h2 className='text-sm font-medium'>Working Category</h2>
        </div>
        <FormMultiSelectField
          form={form}
          name='workingCategory'
          label=''
          placeholder='Choose Working Category'
          options={getAllCategory}
        />

        {editId && (
          <div className='mt-5 grid grid-cols-1 gap-4'>
            <FormSelectField
              form={form}
              name='status'
              label='Status'
              placeholder='Select Status'
              options={[
                { label: 'Draft', value: 'draft' },
                { label: 'Bidding', value: 'bidding' }
              ]}
            />
          </div>
        )}

        <fieldset className='custom-raduis my-6 border border-solid border-gray-300 pb-0 pe-4 ps-4 pt-3'>
          <legend className='font-semibold'>Construction Dates</legend>
          {/* <div className='mt-6'>
          <h2 className='font-semibold'>Construction Dates</h2>
        </div> */}

          <div className='mb-5 mt-2 grid grid-cols-3 gap-4'>
            <div className='flex-1'>
              <FormDatePicker
                name='startDate'
                form={form}
                label='Earliest Start Date'
                disabled={date =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </div>
            <div className='flex-1'>
              <FormDatePicker
                name='finishDate'
                form={form}
                label='Latest Start Date'
                disabled={date =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </div>
            <div className='flex-1'>
              <FormInputField
                form={form}
                name='price'
                label='Pricing'
                placeholder='Max Price'
                type='text'
              />
            </div>
          </div>
        </fieldset>

        <TextEditor
        placeholder="write here.."
          name={'description'}
          form={form}
          label={'Description'}
          className='h-32'
        />
        <div className='mt-16'></div>

        <div className='mt-5 grid grid-cols-1 gap-4'>
          <Separator />
        </div>

        <iframe
          width='100%'
          height='400'
          frameBorder='0'
          scrolling='no'
          marginHeight={0}
          marginWidth={0}
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&output=embed`}
        ></iframe>

        <div className='mt-5 grid grid-cols-1 gap-4'>
          <MultiImageUploader
            updateImage={updateImage} // Now using the correctly formatted array
            setImageUpload={setImageUpload}
          />
        </div>
      </div>
    </>
  )
}

export default WorkOrderFormField
