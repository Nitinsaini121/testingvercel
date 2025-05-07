import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const FormCheckBox = ({ name, form, items = [], label,className }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <div className="mb-2">
              <FormLabel className="text-base">{label}</FormLabel>
            </div>
          )}
          <div className={className}>
            {items.map((item) => (
              <FormItem
                key={item.id || item.value}
                className="flex flex-row items-center space-x-3 space-y-0"
              >
                <FormControl>
               <div>
               <Checkbox
                    checked={Array.isArray(field.value) && field.value.includes(item.value)}
                    onCheckedChange={(checked) => {
                      const current = field.value || [];
                      const updated = checked
                        ? [...current, item.value]
                        : current.filter((v) => v !== item.value);
                      field.onChange(updated);
                    }}
                  />
               </div>
                </FormControl>
                <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
              </FormItem>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCheckBox;
