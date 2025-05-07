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
import { User } from '@/types/user-type'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

interface FilterFiledsProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  placeholder: string
  label: string
  type?: string
  userList: User[]
}

const FilterFileds = <T extends FieldValues>({
  name,
  form,
  placeholder,
  label,
  userList,
}: FilterFiledsProps<T>) => {
  const [open, setOpen] = useState(false)

  const handleNumberChage = (name: Path<T>, item: string) => {

    form.setValue(name, item as PathValue<T, Path<T>>)
    setOpen(false)
  }

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
                  role='combobox'
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between rounded border-color-grey !shadow-none h-12',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field?.value
                    ? userList?.find(item => item?.phoneNumber === field?.value)
                        ?.phoneNumber
                    : placeholder}
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search user...' className='h-9' />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {userList?.length > 0 &&
                      userList?.map(item => (
                        <CommandItem
                          value={item.phoneNumber}
                          key={item.phoneNumber}
                          onSelect={() =>
                            handleNumberChage(name, String(item.phoneNumber))
                          }
                        >
                          {item.firstName} {item.lastName} ({item.phoneNumber})
                          <Check
                            className={cn(
                              'ml-auto',
                              item.phoneNumber === field.value
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
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FilterFileds
