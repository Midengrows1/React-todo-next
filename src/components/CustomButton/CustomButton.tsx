import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import clsx from "clsx";
import "./custombutton.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface ICustomButton {
  className?: string;
  onClick?: () => void;
  icon?: IconDefinition;
  text?: string;
}
const CustomButton: React.FC<ICustomButton> = ({
  className,
  onClick,
  icon,
  text,
}) => {
  return (
    <button className={clsx("custom-button", className)} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />} <span>{text}</span>
    </button>
  );
};

export default CustomButton;
