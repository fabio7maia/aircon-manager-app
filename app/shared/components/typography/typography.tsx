import React from "react";
import { useClassName } from "../../hooks";
import { TClassName } from "../../types";
import { useFontSizeBasedOnDeviceViewport } from "./typography.helper";

export interface TypographyProps {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  bold?: boolean;
  extraBold?: boolean;
  italic?: boolean;
  className?: TClassName;
}

export const Typography: React.FC<TypographyProps> = (props) => {
  const {
    as = "span",
    children,
    bold = false,
    extraBold = false,
    italic = false,
    className,
  } = props;
  const { get } = useClassName();
  const fontSize = useFontSizeBasedOnDeviceViewport({
    as,
    bold,
    extraBold,
    italic,
    className,
  });
  const classNames: string[] = [fontSize];

  if (bold) {
    classNames.push("font-bold");
  }

  if (extraBold) {
    classNames.push("font-extrabold");
  }

  if (italic) {
    classNames.push("italic");
  }

  return React.createElement(
    as,
    {
      className: get(classNames, className),
    },
    children
  );
};
