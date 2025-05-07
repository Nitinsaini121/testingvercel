'use client'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

interface FormInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  inputComponent?: React.ComponentType<InputProps>
}

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  inputComponent: InputComponent = Input
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputComponent className='border-color-grey bg-white h-12' type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
