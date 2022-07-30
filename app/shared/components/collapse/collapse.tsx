import React from "react";
import { useLogger } from "../../hooks";
import { Box } from "../box";

interface CollapseProps {
  title: React.ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
  const [show, setShow] = React.useState(false);
  const logger = useLogger();

  const handleOnClick = React.useCallback(() => {
    logger("Collapse > handleOnClick");

    setShow((oldShow) => !oldShow);
  }, []);

  return (
    <Box
      tabIndex={0}
      className={`collapse collapse-arrow ${
        show ? "collapse-open" : "collapse-close"
      } border border-base-300 bg-base-500 rounded-box`}
    >
      <Box
        className="collapse-title text-xl font-medium cursor-pointer"
        onClick={handleOnClick}
      >
        {title}
      </Box>
      <Box className="collapse-content">{children}</Box>
    </Box>
  );
};
