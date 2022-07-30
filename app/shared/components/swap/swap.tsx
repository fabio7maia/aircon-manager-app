import React from "react";
import { useClassName, useLogger } from "../../hooks";
import { TClassName } from "../../types";
import { Box } from "../box";

interface SwapProps {
  items: React.ReactNode[];
  selectedItemIndex?: number;
  className?: string | TClassName;
}

export const Swap: React.FC<SwapProps> = ({
  children,
  className,
  items = [],
  selectedItemIndex: selectedItemIndexProp = 0,
}) => {
  const { get: getClassName } = useClassName();
  const logger = useLogger();
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(
    selectedItemIndexProp >= items.length ? 0 : selectedItemIndexProp
  );

  const handleOnClick = React.useCallback((evt) => {
    // evt.preventDefault();

    setSelectedItemIndex((oldValue) => {
      return oldValue + 1 >= items.length ? 0 : oldValue + 1;
    });
  }, []);

  logger("Swap", { selectedItemIndex });

  return (
    <>
      <label onClick={handleOnClick} className="swap">
        {items.map((item, index) => {
          let className = "";

          if (selectedItemIndex === index) {
            if (selectedItemIndex % 2 === 0) {
              className = "swap-on";
            } else {
              className = "swap-off";
            }
          }

          return (
            <div key={index * selectedItemIndex + index} className="swap-on">
              {item}
            </div>
          );
        })}
      </label>
    </>
  );
};
