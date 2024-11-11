import React, { forwardRef } from "react";
import "./custominput.sass";
import clsx from "clsx";
interface IInputProps {
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const CustomInput = forwardRef<HTMLInputElement, IInputProps>(
  (
    { onChange, onKeyDown, placeholder, type = "text", className, value },
    ref
  ) => {
    return (
      <input
        type={type}
        className={clsx("customInput", className)}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        ref={ref}
      />
    );
  }
);

export default CustomInput;
