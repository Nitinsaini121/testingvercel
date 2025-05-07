import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface RadioButtonProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  options: { label: string; value: string; icon?: JSX.Element }[]
  onChange?: (value: string) => void
}

const RadioButtonForWorkOrder = <T extends FieldValues>({
  name,
  form,
  options,
  onChange
}: RadioButtonProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={value => {
                field.onChange(value) // Update react-hook-form state
                onChange?.(value) // Call external change handler if provided
              }}
              value={field.value} // Ensure UI reflects selected value
              className='flex space-x-4 gap-7'
            >
              {options.map(option => (
                <FormItem
                  key={option.value}
                  className={cn(
                    'flex h-[180px] w-[250px] cursor-pointer flex-auto flex-col items-start justify-center rounded-lg border !p-5 transition-all !m-0 radio-field relative',
                    field.value === option.value
                      ? 'shadow-md bg-gray-100 border-color-blue active' // Highlight selected option
                      : 'border-gray-300'
                  )}
                >
                  <label className='flex flex-col space-x-2 cursor-pointer w-full gap-3'>
                    {/* Show Icon */}
                    {option.icon && <span className='text-xl'>{option.icon}</span>}
                    {/* Radio Button */}
                    <RadioGroupItem
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={() => field.onChange(option.value)}
                      className='opacity-0 absolute left-0 top-0 w-full h-full !m-0 z-50' // Keep the actual radio hidden
                    />
                    <FormLabel className='font-semibold !m-0 text-lg'>{option.label}</FormLabel>
                  </label>
                  <p className='text-black-900 text-base'>Contractors can submit their price
                  offers. The decision on who does the job is yours.</p>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default RadioButtonForWorkOrder
