import React from "react";
import { useBoxBlocks, useClassName, useLogger } from "../../hooks";
import { TBoxBlocks, TClassName } from "../../types";

export const boxBlocksContext = React.createContext<TBoxBlocks>({});

interface BoxProps {
  name?: string;
  className?: string | TClassName;
  row?: boolean;
  as?: string;
  onClick?: (evt: React.MouseEventHandler) => void;
  ref?: any;
  blocks?: TBoxBlocks;
  tabIndex?: number;
}

export const Box: React.FC<BoxProps> = React.forwardRef(
  (
    {
      as = "div",
      name,
      children,
      className,
      row = false,
      onClick,
      blocks = {},
      tabIndex,
    },
    ref
  ) => {
    const { blocks: storedBlocks, get: getBlock } = useBoxBlocks();
    const { get: getClassName } = useClassName();
    const logger = useLogger();
    const classNamesString =
      typeof className === "string" ? className : className?.className || "";
    const hasFlex = classNamesString.includes("flex");

    name &&
      logger(`Box[${name || ""}]`, {
        hasFlex,
        storedBlocks,
        blocks,
        visible: getBlock(name),
      });

    return (
      <>
        {getBlock(name) && (
          <boxBlocksContext.Provider value={{ ...storedBlocks, ...blocks }}>
            {React.createElement(
              as,
              {
                className: getClassName(
                  row ? "flex flex-row" : hasFlex ? "flex flex-col" : "",
                  className
                ),
                onClick,
                ref,
                tabIndex,
              },
              children
            )}
          </boxBlocksContext.Provider>
        )}
      </>
    );
  }
);
