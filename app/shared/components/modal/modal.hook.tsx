import React from "react";
import { EventHubPayload, useEventHubEmitter } from "react-light-form";

interface UseModalInput {
  name: string;
}

interface UseModalOutput {
  hide: () => void;
  show: () => void;
}

export interface ModalPayload extends EventHubPayload {
  name: string;
  type: "hide" | "show";
}

export const useModal = ({ name }: UseModalInput): UseModalOutput => {
  const { emit } = useEventHubEmitter<ModalPayload>({ key: "modal" });

  return React.useMemo(
    () => ({
      hide: () => {
        emit({
          payload: {
            name,
            type: "hide",
          },
        });
      },
      show: () => {
        emit({
          payload: {
            name,
            type: "show",
          },
        });
      },
    }),
    []
  );
};
