import React from "react";
import { globalDataContext } from "../../providers";

export const useGlobalData = () => {
  return React.useContext(globalDataContext);
};
