import React from "react";
import { Box } from "../box";
import { Collapse } from "../collapse";

interface ShowcaseProps {
  component: string;
}

export const Showcase: React.FC<ShowcaseProps> = ({ component, children }) => (
  <Collapse title={component}>
    {React.Children.map(children, (demo) => (
      <Box className="py-4">{demo}</Box>
    ))}
  </Collapse>
);
