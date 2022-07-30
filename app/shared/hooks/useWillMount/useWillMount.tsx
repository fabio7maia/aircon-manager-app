import React from "react";

export const useWillMount = (callback: () => void) => {
  const initialized = React.useRef(false);

  if (!initialized.current) {
    initialized.current = true;
    callback();
  }
};
