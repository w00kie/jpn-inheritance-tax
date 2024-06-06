import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface CustomFormFieldProps extends FieldValues {
  name: string;
  label: string;
  description: string;
  placeholder?: string;
}

export function NumberFormField(props: CustomFormFieldProps) {
  return (
    <FormField
      control={props.control as Control<FieldValues>}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
          <FormControl>
            <Input {...field} type="number" placeholder={props.placeholder} />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage {...field} />
        </FormItem>
      )}
    />
  );
}
