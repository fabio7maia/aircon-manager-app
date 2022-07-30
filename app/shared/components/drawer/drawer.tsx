import React from "react";
import { MenuAlt1Icon } from "@heroicons/react/solid";
import { Box } from "../box";
import { Overlay } from "../overlay";

interface DrawerProps {}

export const Drawer: React.FC<DrawerProps> = ({ children }) => {
  const [show, setShow] = React.useState(false);

  const handleOnClick = React.useCallback(() => {
    setShow(false);
  }, []);

  return (
    <Box>
      <Box onClick={() => setShow(true)} className="cursor-pointer">
        <MenuAlt1Icon height={32} />
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={show}
        />
      </Box>
      {show && (
        <>
          <Overlay className="z-10" onClick={handleOnClick} />
          <Box className="drawer min-h-screen rounded fixed left-0 top-0 z-20">
            <Box className="drawer-side">
              <Box className="menu p-4 overflow-y-auto min-h-screen w-72 bg-base-100 text-base-content">
                {children}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
