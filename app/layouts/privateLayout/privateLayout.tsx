import React from "react";
import { useNavigate } from "remix";
import {
  Box,
  Footer,
  Navbar,
  useIsUserLogged,
  useDidMount,
  useLogger,
} from "~/shared";
import { routes } from "~/constants";
import { RemixIcon, TailwindIcon } from "~/icons";

export const PrivateLayout: React.FC = ({ children }) => {
  const isUserLogged = useIsUserLogged();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const logger = useLogger();

  useDidMount(() => {
    logger("DEBUG > PrivateLayout > Login", { isUserLogged });
    if (!isUserLogged) {
      navigate(routes.login);
    } else {
      setShow(true);
    }
  });

  if (!show) {
    return null;
  }

  return (
    <Box className="min-h-screen flex-1 justify-between">
      <Navbar
        items={[
          { text: "Me", url: "/me" },
          {
            text: "Packages",
            url: "/docs/packages",
          },
        ]}
      />
      <Box className="p-4 lg:p-12 flex-grow">{children}</Box>
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
  );
};
