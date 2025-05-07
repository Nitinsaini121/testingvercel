import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from '@/components/ui/form';
  import { Input } from '@/components/ui/input';
  import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
  interface FileUploadProps<T extends FieldValues> {
    name: Path<T>;
    form: UseFormReturn<T>;
    label: string;
    className?: string;
    disable?: boolean;
  }
  const FileUpload = <T extends FieldValues>({
    name,
    form,
    label,
    disable,
    className
  }: FileUploadProps<T>) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <Input
                id={name}
                type="file"
                disabled={disable}
                className={className}
                onChange={(e) => {
                  const file = e.target.files; // Get the first selected file
                  onChange(file); // Store the file object in the form state
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  export default FileUpload;