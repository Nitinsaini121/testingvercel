// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'
// import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
// interface FormInputFieldProps<T extends FieldValues> {
//   name: Path<T>
//   form: UseFormReturn<T>
//   placeholder: string
//   label: string
//   type: string
//   className?: string // Add this line
//   disable?: boolean
// }
// const FormInputField = <T extends FieldValues>({
//   name,
//   form,
//   placeholder,
//   label,
//   disable,
//   type
// }: FormInputFieldProps<T>) => {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <FormControl>
//             <TagInput
//               {...field}
//               placeholder='Enter a topic'
//               tags={tags}
//               setTags={newTags => {
//                 setTags(newTags)
//                 setValue('topics', newTags as [Tag, ...Tag[]])
//               }}
//               activeTagIndex={activeTagIndex}
//               setActiveTagIndex={setActiveTagIndex}
//             />
//             ;
//           </FormControl>
//           <FormDescription />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }
// export default FormInputField
