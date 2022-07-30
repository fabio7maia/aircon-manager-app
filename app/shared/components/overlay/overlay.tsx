import React from "react";
import { useClassName, useLogger } from "../../hooks";
import { TClassName } from "../../types";
import { Box } from "../box";

interface OverlayProps {
  className?: string | TClassName;
  onClick?: (evt: React.MouseEventHandler) => void;
}

export const Overlay: React.FC<OverlayProps> = ({ className, onClick }) => {
  const { get } = useClassName();
  const logger = useLogger();

  const handleOnClick = React.useCallback((evt) => {
    logger("Overlay > handleOnClick");

    onClick?.(evt);

    evt.stopPropagation();
    evt.preventDefault();
    return;
  }, []);

  return (
    <Box
      onClick={handleOnClick}
      className={get(
        "w-full h-full fixed top-0 left-0 bg-slate-700 opacity-70",
        className
      )}
    />
  );
};
