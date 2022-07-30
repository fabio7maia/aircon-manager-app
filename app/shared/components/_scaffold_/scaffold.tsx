import React from "react";
import { useClassName, useLogger } from "../../hooks";
import { TClassName } from "../../types";

interface ScaffoldProps {
  className?: string | TClassName;
}

export const Scaffold: React.FC<ScaffoldProps> = ({ children, className }) => {
  const { get: getClassName } = useClassName();
  const logger = useLogger();

  logger("Scaffold");

  return <></>;
};
