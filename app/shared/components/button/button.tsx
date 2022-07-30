import React from "react";
import { useClassName } from "../../hooks";
import { TClassName } from "../../types";

interface ButtonProps {
  className?: string | TClassName;
  icons?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  icons,
  onClick,
  type = "button",
  variant = "primary",
  children,
}) => {
  const { left, right } = icons || {};
  const { get } = useClassName();

  return (
    <button
      type={type}
      className={get(
        variant === "primary"
          ? `btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus`
          : `btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-focus`,
        className
      )}
      onClick={onClick}
    >
      {left && (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          {left}
        </span>
      )}
      {children}
      {right && (
        <span className="absolute right-0 inset-y-0 flex items-center pr-3">
          {right}
        </span>
      )}
    </button>
  );
};
