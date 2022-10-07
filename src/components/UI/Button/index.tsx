import React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

interface IButtonCustom {
  children: React.ReactNode | string;
  typeDisplay?: "primary" | "secondary";
  size?: "lg" | "md" | "sm";
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const ButtonCustom = (props: IButtonCustom) => {
  const {
    children,
    typeDisplay = "primary",
    size = undefined,
    disabled = false,
    className = "",
    onClick,
  } = props;
  return (
    <button
      className={classNames("flex-center", styles.button, {
        [styles[typeDisplay]]: !!typeDisplay,
        [styles[`${size}`]]: !!size,
        [className]: !!className,
        [styles[`disable`]]: disabled,
      })}
      onClick={onClick}
    >
      <>{children}</>
    </button>
  );
};

export default ButtonCustom;
