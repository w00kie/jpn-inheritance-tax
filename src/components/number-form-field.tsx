import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface CustomFormFieldProps extends FieldValues {
  name: string;
  label: string;
  description: string;
  placeholder?: string;
  tooltip?: JSX.Element;
}

export function NumberFormField(props: CustomFormFieldProps) {
  return (
    <FormField
      control={props.control as Control<FieldValues>}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>
            <div className="flex items-center gap-2">
              {props.label}
              {props.tooltip && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="link" size="sm" className="px-0">
                      <CircleHelp className="inline" size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96">
                    {props.tooltip}
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </FormLabel>
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
