import React from "react";
import { useLogger } from "../useLogger";
import { boxBlocksContext } from "../../components";

export const useBoxBlocks = () => {
  const blocks = React.useContext(boxBlocksContext);
  const logger = useLogger();

  const handleGet = React.useCallback((block?: string): boolean => {
    logger("useBoxBlocks > handleGet", { blocks, block });

    return !block || (blocks[block] === undefined && blocks.all)
      ? true
      : blocks[block] || (blocks.all === undefined ? true : false);
  }, []);

  return React.useMemo(
    () => ({
      blocks,
      get: handleGet,
    }),
    [blocks, handleGet]
  );
};
