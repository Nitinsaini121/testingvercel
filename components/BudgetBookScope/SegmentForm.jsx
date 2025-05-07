import { useFieldArray } from "react-hook-form"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import FormInputField from "../share/form/FormInputField"

const SegmentForm = ({ form, catindex, groupIdx }) => {
    const { control } = form
  const {
    fields: segments,
    append: appendSegment,
    remove: removeSegment
  } = useFieldArray({
    control,
    name: `categories.${catindex}.groups.${groupIdx}.sagments`
  })
  const defaultSegmentRow = {
    title: ''
  }

  const handleAppendSegment = () => {
    appendSegment(defaultSegmentRow)
  }
  const deleteSegmentGroup = index => {
    removeSegment(index)
  }
  return (
    <>
      {segments.map((item, index) => {
        return (
          <>
            <div className='mb-2 ml-10 mt-5 flex add-fileds gap-2 gap-2'>
              <FormInputField
                form={form}
                name={`categories.${catindex}.groups.${groupIdx}.sagments.${index}.title`}
                label='Segment Name'
                placeholder='Enter Segment Name'
              />
              <Button
                type='button'
                variant='ghost'
                className='mt-10 h-6 w-6'
                onClick={() => deleteSegmentGroup(index)}
              >
                <Trash2 className='h-4 w-4 text-red-500' />
              </Button>
            </div>
          </>
        )
      })}
      <div className='ml-10 mt-3'>
        <Button
          type='button'
          onClick={handleAppendSegment}
          className='segment-button'
        >
          Add Segment
        </Button>
      </div>
    </>
  )
}

export default SegmentForm
