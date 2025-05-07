import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  FormControl,
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
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

const SelectFilter = ({
  name,
  form,
  placeholder,
  label,
  userList,
  disabled,
  className
}) => {
  const [open, setOpen] = useState(false)
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    'h-12 w-full justify-between rounded border',
                    fieldState.invalid && 'border-red-500',
                    !field.value && 'text-muted-foreground',
                    className
                  )}
                >
                  {field.value
                    ? userList.find(item => item.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className='opacity-50 ml-2 h-4 w-4' />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search user...' className='h-9' />
                <CommandList>
                  <CommandEmpty>No Item found.</CommandEmpty>
                  <CommandGroup>
                    {userList?.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item?.label?.toLowerCase()}
                        onSelect={() => {
                          form.setValue(name, item.value, { shouldValidate: true }) // 🔥 triggers validation
                          setOpen(false)
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            item.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage /> {/* ✅ will show error if exists */}
        </FormItem>
      )}
    />
  )
}

export default SelectFilter