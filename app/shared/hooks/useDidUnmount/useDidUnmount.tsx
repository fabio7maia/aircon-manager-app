import React from "react";

export const useDidUnmount = (callback: () => void) => {
  React.useEffect(() => callback, []);
};
