import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem
} from '@/components/ui/form'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface FormCheckBoxProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  description: string
}

const FormCheckBox = <T extends FieldValues>({
  name,
  form,
  description
}: FormCheckBoxProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
         
          <FormControl>
            <Checkbox
              checked={Boolean(field.value)}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormDescription className='text-sm text-dark-color'>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  )
}

export default FormCheckBox
