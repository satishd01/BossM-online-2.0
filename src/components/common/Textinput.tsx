import React, { useState } from "react";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { CleaveOptions } from "cleave.js/options";
import { EyeIcon } from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Check } from "@mui/icons-material";

interface TextinputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  classLabel?: string;
  className?: string;
  classGroup?: string;
  classDescription?: string;
  register?: any;
  name?: string;
  readonly?: boolean;
  value?: any;
  error?: any;
  icon?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  horizontal?: boolean;
  validate?: any;
  isMask?: boolean;
  msgTooltip?: string;
  description?: string;
  hasicon?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options?: CleaveOptions;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  defaultValue?: any;
  required?: boolean;
  Arrows?: React.ReactNode;
  [key: string]: any;
}
const Textinput = ({
  type,
  label,
  placeholder = "Add placeholder",
  classLabel = "form-label ",
  className = "",
  classGroup = "",
  classDescription = "",
  register,
  name,
  readonly,
  value,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  isMask,
  msgTooltip,
  description,
  hasicon,
  onChange,
  options,
  onFocus,
  defaultValue,
  required,
  Arrows,
  ...rest
}: TextinputProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`fromGroup mt-5  ${error ? "has-error" : ""} ${
        horizontal ? "flex" : ""
      } ${validate ? "is-valid" : ""}`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`block capitalize  text-sm md:text-lg ${classLabel} ${
            horizontal ? "flex-0 md:w-[100px] w-[60px] break-words" : ""
          }`}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={`relative ${horizontal ? "flex-1" : ""}`}>
        {name && !isMask && (
          <input
            type={type === "password" && open === true ? "text" : type}
            {...register(name)}
            {...rest}
            className={`${
              error ? "has-error pl-6 border-red-500 " : ""
            } form-control py-2 ${className} ${
              type === "number" && Arrows ? "" : "no-arrows"
            }`}
            placeholder={placeholder}
            readOnly={readonly}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            onChange={onChange}
          />
        )}
        {!name && !isMask && (
          <input
            type={type === "password" && open === true ? "text" : type}
            className={`form-control py-2 ${className} ${
              type === "number" && Arrows ? "" : "no-arrows"
            }`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            id={id}
          />
        )}
        {name && isMask && (
          <Cleave
            {...register(name)}
            {...rest}
            placeholder={placeholder}
            options={options}
            className={`${
              error ? "has-error pl-6 " : ""
            } form-control py-2 ${className}`}
            onFocus={onFocus}
            id={id}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
          />
        )}
        {!name && isMask && options && (
          <Cleave
            placeholder={placeholder}
            options={options}
            className={`${
              error ? "has-error pl-6" : ""
            } form-control py-2 ${className}`}
            onFocus={onFocus}
            id={id}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
          />
        )}
        {/* icon */}
        <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2 space-x-1 rtl:space-x-reverse">
          {hasicon && (
            <span
              className="cursor-pointer text-secondary-500"
              onClick={handleOpen}
            >
              {open && type === "password" && <EyeIcon />}
              {!open && type === "password" && <EyeClosedIcon />}
            </span>
          )}

          {validate && (
            <span className="text-success-500">
              <Check />
            </span>
          )}
        </div>
      </div>
      {/* error and success message*/}

      <div
        className={`mt-1 h-2 text-red-400  ${
          horizontal === true ? "absolute bottom-[-20px] left-[50%]" : ""
        } ${
          msgTooltip
            ? "inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded"
            : "text-danger-500 block text-sm"
        }`}
      >
        {error ? error.message : ""}
      </div>

      {/* validated and success message*/}
      {validate && (
        <div
          className={`mt-1 ${
            msgTooltip
              ? "inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded"
              : "text-success-500 block text-sm"
          }`}
        >
          {validate}
        </div>
      )}
      {/* only description */}
      {description && (
        <span className={`input-description ${classDescription}`}>
          {description}
        </span>
      )}
    </div>
  );
};

export default Textinput;
