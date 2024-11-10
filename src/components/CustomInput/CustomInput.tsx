import React from "react";
import s from "./custominput.module.sass";
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

const CustomInput: React.FC<IInputProps> = ({
  onChange,
  onKeyDown,
  placeholder,
  type = "text",
  className,
  value,
  ref,
}) => {
  return (
    <input
      type={type}
      className={clsx(s.customInput, { [className!]: className })}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      ref={ref}
    />
  );
};

export default CustomInput;
