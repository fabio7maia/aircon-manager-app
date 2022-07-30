import React from "react";
import { useDeviceViewport } from "../../hooks";
import { TViewport } from "../../types";

interface VPProps {
  viewport: TViewport | TViewport[];
}

export const VP: React.FC<VPProps> = ({ viewport, children }) => {
  const deviceViewport = useDeviceViewport();

  if (
    !deviceViewport ||
    (viewport &&
      ((!Array.isArray(viewport) && viewport !== deviceViewport) ||
        (Array.isArray(viewport) && !viewport.includes(deviceViewport))))
  ) {
    return null;
  }

  return <>{children}</>;
};
