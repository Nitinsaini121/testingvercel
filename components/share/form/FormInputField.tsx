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
}

const FormInputField = <T extends FieldValues>({
  name,
  form,
  placeholder,
  label,
  disable,
  type,
  className
}: FormInputFieldProps<T>) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {type === 'color' ? (
              <div className="flex items-center">
                <Input
                  {...field}
                  disabled={disable}
                  className={`h-12 !w-full !rounded-l-none !rounded border-s-0 bg-white !shadow-none ${
                    fieldState.error ? 'border-red-500' : ''
                  } ${className}`}
                  type="color"
                />
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  className={`h-12 !w-full !rounded-l-none !rounded-r border-s-0 bg-white !shadow-none ${
                    fieldState.error ? 'border-red-500' : ''
                  } ${className}`}
                  placeholder={placeholder}
                />
              </div>
            ) : (
              <Input
                {...field}
                disabled={disable}
                className={`custom-radius h-12 bg-white !shadow-none rounded border-color-grey ${
                  fieldState.error ? 'border-red-500' : ''
                } ${className}`}
                placeholder={placeholder}
                type={type}
                min={0}
              />
            )}
          </FormControl>
          <FormMessage />
          <FormDescription />
        </FormItem>
      )}
    />
  )
}

export default FormInputField
