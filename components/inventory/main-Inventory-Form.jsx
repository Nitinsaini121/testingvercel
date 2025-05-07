import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import FormTextArea from '../share/form/TextArea'
import { CardDescription } from '../ui/card'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { MultiImageUploader } from '../work-order/DragDroInput'
import TextEditor from '../work-order/TextEditor'

const MainInventoryForm = ({ updateImage, form, setImageUpload }) => {
  const brand = [
    {
      label: 'Brand1',
      value: 'Brand1'
    },
    {
      label: 'Brand2',
      value: 'Brand2'
    }
  ]
  return (
    <>
      {/* main */}
      <CardDescription className='mb-3 mt-5 text-2xl font-semibold text-gray-700'>
        Main
      </CardDescription>
      <div className='main-form mb-2 mt-5 grid grid-cols-2 gap-4'>
        <FormInputField
          form={form}
          name='sku'
          label='SKU'
          placeholder='Enter SKU'
          type='number'
          className='!rounded'
        />
        <FormSelectField
          form={form}
          name='brand'
          label='Brand'
          placeholder='Select Brand'
          options={brand}
        />
      </div>
      <div>
        <FileUpload
          form={form}
          name='image'
          label='Image'
          className='!mb-4 h-12 py-3 rounded !shadow-none border border-color-grey '
        />
        <FormTextArea
          form={form}
          name='shortDescription'
          label='Short Description'
          type='text'
          className='!mb-4'
        />

        <TextEditor
          name={'longDescription'}
          form={form}
          placeholder='Write something here...'
          label={'Long Description'}
          className='!mb-16 h-32'
        />
        <Label>Product Gallery</Label>
        <MultiImageUploader
         updateImage={updateImage} // Now using the correctly formatted array
         setImageUpload={setImageUpload}
        />
      </div>
      <Separator className='my-10' />
    </>
  )
}

export default MainInventoryForm
