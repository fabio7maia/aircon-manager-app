import React from "react";
import { Box } from "../../components";
import { FormBuilder } from "../form";

interface PageBlock {
  type: string;
  blocks?: PageBlock[];
  children?: any;
  fields?: any[];
}

interface PageBuilderProps {
  blocks: PageBlock[];
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ blocks = [] }) => {
  const buildBlocks = React.useCallback(
    (blocks: PageBlock[]): React.ReactNode => {
      return blocks.map((block) => {
        if (block.type === "form") {
          return <FormBuilder fields={block.fields || []} />;
        } else if (block.blocks) {
          return buildBlocks(block.blocks);
        }

        return <Box>{block.children}</Box>;
      });
    },
    []
  );

  return <>{buildBlocks(blocks)}</>;
};
