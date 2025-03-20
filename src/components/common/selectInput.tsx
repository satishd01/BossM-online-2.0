import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { ForwardedRef, forwardRef } from "react";

interface SelectInputProps {
  label?: string;
  options: Array<{ value: string | number; label: string | number }>;
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  groupClassName?: string;
  labelClassName?: string;
  itemClassName?: string;
  onChange?: (value: string | number) => void;
  value?: any;
  defaultValue?: string | undefined;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  placeholder = "Select",
  triggerClassName = "",
  contentClassName = "",
  groupClassName = "",
  labelClassName = "block",
  itemClassName = "",
  value,
  onChange,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <div className="flex flex-col gap-2">
        <Label className={labelClassName}>{label}</Label>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          <SelectGroup className={groupClassName}>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value as string}
                className={itemClassName}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </div>
    </Select>
  );
};

export default SelectInput;
