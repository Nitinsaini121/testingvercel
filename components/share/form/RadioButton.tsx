import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface RadioButtonProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  label: string
  options: { label: string; value: string }[] // Dynamic options
  onChange?: (value: string) => void
}

const RadioButton = <T extends FieldValues>({
  name,
  form,
  label,
  options,
  onChange
}: RadioButtonProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className={`!flex-nowrap !flex-row !mb-5 gap-4 radio-collunm`}>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value) 
                onChange?.(value) 
              }}
              value={field.value} 
              className='flex flex-col space-y-1'
            >
              {options?.map((option) => (
                <FormItem
                  key={option.value}
                  className='flex items-center space-x-3 space-y-0 !mt-0 radio-btn'
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className='font-normal !ml-2'>{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default RadioButton
