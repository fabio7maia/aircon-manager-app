import React from "react";

export const useForceUpdate = () => {
  const [, setTick] = React.useState(0);

  return React.useCallback(() => {
    setTick((val) => val + 1);
  }, []);
};
