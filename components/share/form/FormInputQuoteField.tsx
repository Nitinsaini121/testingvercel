'use client'

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
import { useEffect } from 'react'

interface FormInputFieldProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  placeholder: string
  label?: string
  type: string
  className?: string
  disable?: boolean
  defaultValue?: string | number
}

const FormInputQuoteField = <T extends FieldValues>({
  name,
  form,
  placeholder,
  label,
  disable,
  type,
  className,
  defaultValue
}: FormInputFieldProps<T>) => {
  useEffect(() => {
    const currentValue = form.getValues(name)
    if (defaultValue !== undefined && (currentValue === undefined || currentValue === '')) {
      form.setValue(name, defaultValue as any)
    }
  }, [defaultValue, form, name]) ///check cat status

  return (
    <FormField
      control={form.control}
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

export default FormInputQuoteField
