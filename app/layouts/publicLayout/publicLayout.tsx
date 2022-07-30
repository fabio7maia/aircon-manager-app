import React from "react";
import { Box, Footer, useClassName } from "~/shared";
import { RemixIcon, TailwindIcon } from "~/icons";

interface PublicLayoutProps {
  className?: string;
  blocks?: {
    all?: boolean;
    footer?: boolean;
  };
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  className,
  blocks,
}) => {
  const { get } = useClassName();

  return (
    <Box blocks={blocks} className={get("min-h-screen", className)}>
      <Box className="p-4 lg:p-12 flex-grow">{children}</Box>
      <Box name="footer">
        <Footer>
          <Box>
            <Box>Powered by</Box>
            <Box row className="justify-center pt-4">
              <Box className="w-32 justify-center items-center">
                <RemixIcon />
              </Box>
              <Box className="w-32 justify-center items-center">
                <TailwindIcon />
              </Box>
            </Box>
          </Box>
        </Footer>
      </Box>
    </Box>
  );
};
