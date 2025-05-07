import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface FormInputFieldProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  placeholder: string
  label?: string
  type: string
  className?: string
  disable?: boolean
  value: any
  readOnly: boolean
}

const FormInputField = <T extends FieldValues>({
  name,
  form,
  placeholder,
  label,
  disable,
  type,
  className,
  value,
  readOnly
}: FormInputFieldProps<T>) => {
  // console.log('value', value)
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              disabled={disable}
              value={value ?? field.value}
              readOnly={readOnly && readOnly}
              className={`custom-radius border-color-grey h-12 !rounded bg-white !shadow-none ${
                fieldState.error ? 'border-red-500' : ''
              } ${className}`}
              placeholder={placeholder}
              type={type}
              min={0}
              step='any'
            />
          </FormControl>
          <FormMessage />
          <FormDescription />
        </FormItem>
      )}
    />
  )
}

export default FormInputField
