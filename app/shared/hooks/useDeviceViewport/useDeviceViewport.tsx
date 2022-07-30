import React from "react";
import { TViewport } from "../../types/viewport/viewport";

export const useDeviceViewport = (): TViewport | undefined => {
  const handleGetViewport = React.useCallback((): TViewport => {
    const width = window.innerWidth;

    if (width >= 1536) {
      return "2xl";
    } else if (width >= 1280) {
      return "xl";
    } else if (width >= 1024) {
      return "lg";
    } else if (width >= 768) {
      return "md";
    }

    return "sm";
  }, []);

  const [viewport, setViewport] = React.useState<TViewport>();

  React.useEffect(() => {
    const handleResize = () => {
      setViewport(handleGetViewport());
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewport;
};
