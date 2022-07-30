import React from "react";
import { ClassName } from "~/types";

export const useClassName = () => {
  const handleGet = React.useCallback(
    (className: string | string[], props?: string | ClassName): string => {
      const treatClassNameArrayOrString = () =>
        Array.isArray(className) ? className.join(" ") : className;

      if (!props) {
        return treatClassNameArrayOrString();
      }

      if (typeof props === "string") {
        return `${treatClassNameArrayOrString()} ${props}`;
      }

      const { className: classNameProps, options } = props;
      const { replace = false } = options || {};
      return replace
        ? classNameProps
        : `${classNameProps} ${treatClassNameArrayOrString()} `;
    },
    []
  );

  return React.useMemo(
    () => ({
      get: handleGet,
    }),
    []
  );
};
