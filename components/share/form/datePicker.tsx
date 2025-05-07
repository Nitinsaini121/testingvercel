import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  label: string
  disabled?: (date: Date) => boolean 
}

const FormDatePicker = <T extends FieldValues>({
  name,
  form,
  label,
  disabled
}: FormDatePickerProps<T>) => {
  const [open, setOpen] = useState(false)
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  onClick={() => setOpen(prev => !prev)}
                  className={cn(
                    'w-full pl-3 text-left font-normal h-12 rounded border-color-grey !shadow-none',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field?.value ? format(field?.value, 'dd/MM/yyyy') : 'Pick a date'}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                className='bg-white !shadow-[0_0_15px_-13px_black] shadow-slate-100'
                mode='single'
                selected={field.value}
                onSelect={date => {
                  field.onChange(date)
                  setOpen(false)
                }}
                disabled={disabled  }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormDatePicker
