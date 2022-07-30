import React from "react";

const LOGGER_ACTIVE = true;

export const useLogger = () => {
  return React.useMemo(
    () =>
      (msg: any, ...rest: any) =>
        LOGGER_ACTIVE ? console.log(msg, rest) : undefined,
    []
  );
};
