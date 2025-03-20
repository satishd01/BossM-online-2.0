"use client";

import * as React from "react";
import { format, isPast } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Calendar, CalendarProps } from "../ui/calendar";

export function DatePicker({
  label,
  classLabel,
  className,
  selected,
  onSelect,
  showTodaysDate = false,
  ...props
}: {
  label?: string;
  classLabel?: string;
  className?: string;
  selected?: Date;
  showTodaysDate?: boolean;
  onSelect: (date: Date | undefined) => void;
  props?: CalendarProps;
}) {
  return (
    <Popover>
      <div className="w-full flex flex-col">
        {label && (
          <Label
            className={`block text-md font-medium text-slate-700 ${classLabel}`}
          >
            {label}
          </Label>
        )}
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              " justify-start text-left font-normal rounded-lg h-11",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? (
              format(selected, "dd-MM-yyyy")
            ) : showTodaysDate ? (
              format(new Date(), "dd-MM-yyyy")
            ) : (
              <span>DD/MM/YYYY</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            // disabled={(date) => isPast(date)}
            {...props}
          />
        </PopoverContent>
      </div>
    </Popover>
  );
}
