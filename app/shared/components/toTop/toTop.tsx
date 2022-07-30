import React from "react";
import { ArrowCircleUpIcon } from "@heroicons/react/outline";
import { Box } from "../box";
import { useEventListener } from "../../hooks";

export const ToTop: React.FC = ({}) => {
  const [show, setShow] = React.useState(false);

  const handleOnScroll = React.useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    const scrollY = window.scrollY;

    setShow(windowHeight < documentHeight && scrollY > 0);
  }, []);

  useEventListener({
    callback: handleOnScroll,
    event: "scroll",
  });

  React.useEffect(handleOnScroll, []);

  const handleOnClick = React.useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {show && (
        <Box
          className="fixed bottom-4 right-4 bg-primary p-2 rounded-2xl cursor-pointer"
          onClick={handleOnClick}
        >
          <ArrowCircleUpIcon className="w-8 h-8" />
        </Box>
      )}
    </>
  );
};
