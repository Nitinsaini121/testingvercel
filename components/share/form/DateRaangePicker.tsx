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

interface FormDatePickerRangeProps<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  label: string
  disabled?: (date: Date) => boolean
}

const FormDatePickerRange = <T extends FieldValues>({
  name,
  form,
  label,
  disabled
}: FormDatePickerRangeProps<T>) => {
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
                  id='date'
                  variant='outline'
                  className={cn(
                    'h-12 w-full pl-3 text-left font-normal rounded border-color-grey !shadow-none',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, 'LLL dd, y')} -{' '}
                        {format(field.value.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(field.value.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a start & end date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                className='bg-white !shadow-[0_0_15px_-13px_black] shadow-slate-100'
                initialFocus
                mode='range'
                defaultMonth={field.value?.from}
                selected={field.value}
                onSelect={date => {
                  if (date?.from && date?.to) {
                    setOpen(false) // Close the calendar when both dates are selected
                  }
                  field.onChange(date)
                }}
                numberOfMonths={2}
                disabled={disabled}
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

export default FormDatePickerRange

// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import {
// FormControl,
// FormDescription,
// FormField,
// FormItem,
// FormLabel,
// FormMessage
// } from '@/components/ui/form'
// import {
// Popover,
// PopoverContent,
// PopoverTrigger
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import { format } from 'date-fns'
// import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
//
// import { CalendarIcon } from 'lucide-react'
// import { useState } from 'react'
//
// interface FormDatePickerRangeProps<T extends FieldValues> {
// name: Path<T>
// form: UseFormReturn<T>
// label: string
// disabled?: (date: Date) => boolean
// }
//
// const FormDatePickerRange = <T extends FieldValues>({
// name,
// form,
// label,
// disabled
// }: FormDatePickerRangeProps<T>) => {
// const [open, setOpen] = useState(false)
//
// return (
// <FormField
// control={form.control}
// name={name}
// render={({ field }) => (
// <FormItem>
{
  /* <FormLabel>{label}</FormLabel> */
}
{
  /* <Popover open={open} onOpenChange={setOpen}> */
}
{
  /* <PopoverTrigger asChild> */
}
{
  /* <FormControl> */
}
{
  /* <Button */
}
// id="date"
// variant="outline"
// className={cn(
// 'w-full pl-3 text-left font-normal h-12 custom-raduis',
// !field.value && "text-muted-foreground"
// )}
// >
{
  /* <CalendarIcon className="mr-2 h-4 w-4" /> */
}
{
  /* {field.value?.from ? ( */
}
// field.value.to ? (
// <>
{
  /* {format(field.value.from, "LLL dd, y")} -{" "} */
}
{
  /* {format(field.value.to, "LLL dd, y")} */
}
{
  /* </> */
}
// ) : (
// format(field.value.from, "LLL dd, y")
// )
// ) : (
// <span>Pick a date</span>
// )}
{
  /* </Button> */
}
{
  /* </FormControl> */
}
{
  /* </PopoverTrigger> */
}
{
  /* <PopoverContent className="w-auto p-0" align="start"> */
}
{
  /* <Calendar */
}
// className="bg-white !shadow-[0_0_15px_-13px_black] shadow-slate-100"
// initialFocus
// mode="range"
// defaultMonth={field.value?.from}
// selected={field.value}
// onSelect={(date) => {
// field.onChange(date)
// if (date?.from && date?.to) {
// setOpen(false) // Close when both dates are selected
// }
// }}
// numberOfMonths={2}
// disabled={disabled}
// />
{
  /* </PopoverContent> */
}
{
  /* </Popover> */
}
{
  /* <FormDescription /> */
}
{
  /* <FormMessage /> */
}
{
  /* </FormItem> */
}
// )}
// />
// )
// }
//
// export default FormDatePickerRange
//
