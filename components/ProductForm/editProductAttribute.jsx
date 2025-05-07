'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AttributeServices from '../services/attribute-api'
import ProductAttributeServices from '../services/productAttribute-api'
import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form } from '../ui/form'
import { errorMessage } from '../ToasterMessage'

const EditAttribute = ({ editData, onClose, getListAttributes }) => {
  const [attributeOptions, setAttributeOptions] = useState([])
  const form = useForm()
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await AttributeServices.getAllAttributes()
        if(response.status === 200){

          setAttributeOptions(response?.data?.data?.attributes)
        }
      } catch (error) {
        if (error) {
          errorMessage({ description: error?.response?.data?.message})
        
        }
      }
    }

    fetchAttributes()

    // Populate form with existing data
    if (editData) {
      form.reset({
        name: editData.name,
        value: editData.value
      })
    }
  }, [editData, form])

  const onSave = async data => {
    try {
      const formData = data
      //   const formData = data.attributes.map(attr => ({
      //     name: attr.name,
      //     value: attr.value.map(val => val.value)
      //   }))

      await ProductAttributeServices.updateProductAttributesById(
        editData.id,
        formData
      )
      getListAttributes()
      onClose()
    } catch (error) {
      console.error('Error updating attribute:', error)
    }
  }
  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogHeader>
          <DialogTitle>Edit Attribute</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit(onSave)()
              }}
            >
              <FormInputField
                form={form}
                name={`name`}
                placeholder='Enter name'
                label='Name'
                disable
              />
              <FormMultiSelectField
                form={form}
                name='value'
                placeholder='Enter value'
                label='Select Value'
                options={
                  attributeOptions
                    .find(attr => attr.name === form.getValues('name'))
                    ?.configAttributes?.map(config => ({
                      label: config.name,
                      value: config.name
                    })) || []
                }
              />
              <Button type='submit' className='mt-4'>
                Save Changes
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditAttribute

// import { useEffect, useState } from 'react'
// import { useFieldArray, useForm } from 'react-hook-form'
// import AttributeServices from '../services/attribute-api'
// import ProductAttributeServices from '../services/productAttribute-api'
// import FormInputField from '../share/form/FormInputField'
// import FormMultiSelectField from '../share/form/FormMultiSelect'
// import { Button } from '../ui/button'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

// const EditAttribute = ({ editData, onClose, getListAttributes }) => {
//   const [attributeOptions, setAttributeOptions] = useState([])

//   const form = useForm({
//     defaultValues: {
//       attributes: [
//         {
//           name: '',
//           value: []
//         }
//       ]
//     }
//   })

//   const {
//     fields: attributes,
//     append,
//     remove
//   } = useFieldArray({
//     control: form.control,
//     name: 'attributes'
//   })

//   useEffect(() => {
//     const fetchAttributes = async () => {
//       const response = await AttributeServices.getAllAttributes()
//       setAttributeOptions(response?.data?.data?.attributes)
//     }

//     fetchAttributes()

//     // Populate form with existing data
//     if (editData) {
//       form.reset({
//         name: editData.name,
//         value: editData.value
//       })
//     }
//   }, [editData, form])

//   const onSave = async data => {
//     try {
//       const formData = data.attributes.map(attr => ({
//         name: attr.name,
//         value: attr.value.map(val => val.value)
//       }))

//       await ProductAttributeServices.updateProductAttributesById(
//         editData.id,
//         formData
//       )
//       getListAttributes()
//       onClose()
//     } catch (error) {
//       console.error('Error updating attribute:', error)
//     }
//   }

//   return (
//     <Dialog open onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Attribute</DialogTitle>
//         </DialogHeader>
//         <form
//           onSubmit={e => {
//             e.preventDefault()
//             e.stopPropagation()
//             form.handleSubmit(onSave)()
//           }}
//         >
//           {/* {attributes.map((field, index) => ( */}
//           <div className=''>
//             <FormInputField
//               form={form}
//               name={`name`}
//               placeholder='Enter name'
//               label='Name'
//               disable
//             />
//             <FormMultiSelectField
//               form={form}
//               name='value'
//               placeholder='Enter value'
//               label='Select Value'
//               options={
//                 attributeOptions
//                   .find(attr => attr.name === form.getValues('name'))
//                   ?.configAttributes?.map(config => ({
//                     label: config.name,
//                     value: config.name
//                   })) || []
//               }
//             />

//             {/* <div
//                 className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500"
//                 onClick={() => remove(index)}
//               >
//                 <Trash2 className="h-5 w-5 text-white" />
//               </div> */}
//           </div>
//           {/* ))} */}

//           <Button type='submit' className='mt-4'>
//             Save Changes
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default EditAttribute
