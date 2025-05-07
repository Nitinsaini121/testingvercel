import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { FieldErrors, FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface FormTextAreaProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  placeholder: string
  label: string
  content?: React.ReactNode
  className?: string
  errors?: FieldErrors<T>
  disable?: (date: Date) => boolean 
}

const FormTextArea = <T extends FieldValues>({
  name,
  form,
  placeholder,
  // disable,
  label,
  content,
  className,
  errors
}: FormTextAreaProps<T>) => {
  const errorMessage = errors?.[name]?.message as string | undefined
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            {content && <p className='text-sm text-gray-500'>{content}</p>}
            <FormControl>
              <Textarea
                className={`custom-radius border-color-grey h-12 rounded bg-white !shadow-[0_0_15px_-13px_black] !shadow-none shadow-slate-100 ${className} ${
                  errorMessage ? 'border-red-500' : ''
                }`}
                {...field}
                // disabled={disable}
                value={field.value?.replace(/<[^>]*>/g, '')}
                placeholder={placeholder}
              />
            </FormControl>
            {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
            {/* Fix here */}
          </FormItem>
        )
      }}
    />
  )
}

export default FormTextArea
