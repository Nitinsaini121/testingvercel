import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface Option {
  label: string
  value: string
  icon?: React.ElementType
  disabled?: boolean
}

interface FormSelectFieldProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  label: string
  placeholder?: string
  options: Option[]
  className?: string
  disabled?: boolean
}

const FormSelectField = <T extends FieldValues>({
  name,
  form,
  label,
  className,
  placeholder = 'Select an option',
  options,
  disabled
}: FormSelectFieldProps<T>) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            value={field.value || ''}
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl
              className={`border-color-grey h-12 rounded !bg-white !shadow-none ${
                fieldState.error ? 'border-red-500' : ''
              } ${className}`}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.icon ? (
                    <>
                      <option.icon className='mr-2 inline h-5 w-5' />
                      {option.label}
                    </>
                  ) : (
                    option.label
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
          <FormDescription />
        </FormItem>
      )}
    />
  )
}

export default FormSelectField
