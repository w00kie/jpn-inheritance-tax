import { useState, useEffect } from "react";
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
      render={({ field: { onChange, value, ...rest } }) => {
        // Initialize displayValue to "0" formatted when value is undefined or 0.
        const [displayValue, setDisplayValue] = useState(
          value !== undefined && !isNaN(Number(value))
            ? Number(value).toLocaleString()
            : "0"
        );
        useEffect(() => {
          setDisplayValue(
            value !== undefined && !isNaN(Number(value))
              ? Number(value).toLocaleString()
              : "0"
          );
        }, [value]);
        return (
          <FormItem>
            <FormLabel htmlFor={rest.name}>
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
              <Input
                {...rest}
                name={rest.name}
                type="text" // remains text for formatting
                placeholder={props.placeholder}
                value={displayValue}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/,/g, "");
                  if (rawValue === "") {
                    onChange(0);
                    setDisplayValue("");
                    return;
                  }
                  const numericValue = Number(rawValue);
                  if (!isNaN(numericValue)) {
                    onChange(numericValue);
                    setDisplayValue(numericValue.toLocaleString());
                  }
                }}
              />
            </FormControl>
            <FormDescription>{props.description}</FormDescription>
            <FormMessage {...rest} />
          </FormItem>
        );
      }}
    />
  );
}
