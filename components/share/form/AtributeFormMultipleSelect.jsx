'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
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
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

const AtributeFormMultipleSelect = ({
  name,
  form,
  label,
  placeholder = 'Select options',
  options,
  fieldValue
}) => {
  const [open, setOpen] = useState(false)
  const [defaultValues, setDefaultValues] = useState([])

  useEffect(() => {
    const localDataAttribute = JSON.parse(
      localStorage.getItem('oldAtributeData') || '[]'
    )
    const data =
      localDataAttribute.find(item => item.name === fieldValue)?.value || []
    setDefaultValues(data)
  }, [fieldValue])

  // Set default values to form once on load
  useEffect(() => {
    const currentValue = form.getValues(name)
    if (
      (!currentValue || currentValue.length === 0) &&
      defaultValues.length > 0
    ) {
      form.setValue(name, defaultValues)
    }
  }, [defaultValues, form, name])

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selectedValues = Array.isArray(field.value)
          ? field.value
          : defaultValues

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='border-color-grey h-12 w-full justify-between whitespace-normal rounded font-normal !shadow-none'
                >
                  {selectedValues.length > 0
                    ? options
                        .filter(option => selectedValues.includes(option.value))
                        .map(option => option.label)
                        .join(', ')
                    : placeholder}
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='max-h-64 overflow-y-auto'>
                {options?.map(option => (
                  <div
                    key={option.value}
                    className='flex cursor-pointer items-center space-x-2 rounded p-2 hover:bg-gray-100'
                    onClick={() => {
                      const newValue = selectedValues.includes(option.value)
                        ? selectedValues.filter(val => val !== option.value)
                        : [...selectedValues, option.value]
                      field.onChange(newValue)
                    }}
                  >
                    <Checkbox checked={selectedValues.includes(option.value)} />
                    {option.icon && <option.icon className='mr-2 h-5 w-5' />}
                    <span>{option.label}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <FormDescription />
            <FormMessage>
              {typeof form.formState.errors[name]?.message === 'string'
                ? form.formState.errors[name]?.message
                : ''}
            </FormMessage>
          </FormItem>
        )
      }}
    />
  )
}

export default AtributeFormMultipleSelect
