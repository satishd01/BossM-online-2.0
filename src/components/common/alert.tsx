import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CommonAlert = ({
  title,
  description = "",
  onCancel,
  onContinue,
  triggerText,
  showModal = false,
  AlertDiaogTitle,
  ButtonText = "Continue",
  titleClassName,
  contentClassName,
  descriptionclassName,
  Icon,
  showInput = false, // New prop to show input field
}: {
  title: string;
  description: string;
  onCancel?: () => void;
  onContinue: (inputValue?: string) => void; // Updated to pass input value
  triggerText?: string;
  showModal: boolean;
  AlertDiaogTitle?: string;
  ButtonText?: string;
  titleClassName?: string;
  contentClassName?: string;
  descriptionclassName?: string;
  Icon?: string;
  showInput?: boolean; // New prop
}) => {
  const [inputValue, setInputValue] = useState<string>(""); // State to hold input value

  return (
    <AlertDialog open={showModal}>
      {triggerText && <AlertDialogTrigger>{triggerText}</AlertDialogTrigger>}
      <AlertDialogContent className={contentClassName}>
        <AlertDialogHeader>
          <AlertDialogTitle className={titleClassName}>
            {AlertDiaogTitle ? AlertDiaogTitle : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription className={descriptionclassName}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Show input field conditionally */}
        {showInput && (
          <div className="my-4">
            <label htmlFor="amount" className="block mb-2 text-sm font-medium">
              Enter Amount:
            </label>
            <input
              id="amount"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter the amount"
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onContinue(inputValue)}>
            {ButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommonAlert;
