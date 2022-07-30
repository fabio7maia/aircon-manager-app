import React from "react";

interface UseEventListenerInput {
  event: keyof WindowEventMap;
  callback: () => void;
  remove?: boolean;
}

export const useEventListener = ({
  event,
  callback,
  remove = true,
}: UseEventListenerInput) => {
  React.useEffect(() => {
    window.addEventListener(event, callback);

    return () => {
      remove && window.removeEventListener(event, callback);
    };
  }, []);
};
