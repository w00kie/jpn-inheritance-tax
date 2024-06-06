import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <CircleHelp className="inline" size={16} />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96">
                    {props.tooltip}
                  </HoverCardContent>
                </HoverCard>
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
