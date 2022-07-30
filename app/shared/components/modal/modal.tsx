import React from "react";
import ReactDOM from "react-dom";
import { useEventHubSubscriber } from "react-light-form";
import { useLogger } from "../../hooks";
import { Box } from "../box";
import { Button } from "../button";
import { Overlay } from "../overlay";
import { ModalPayload } from "./modal.hook";

interface ModalButtonItem {
  onClick: () => void;
  label: string;
}

interface ModalButtons {
  primary: ModalButtonItem;
  secondary?: ModalButtonItem;
}

interface ModalProps {
  name: string;
  buttons: ModalButtons;
  allowClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  buttons,
  name,
  allowClose = true,
}) => {
  const { primary, secondary } = buttons;
  const [show, setShow] = React.useState(false);
  const logger = useLogger();

  useEventHubSubscriber<ModalPayload>({
    callback: (data) => {
      logger(`Modal > useEventHubSubscriber [${name}]`, { data });

      if (data.payload.name === name) {
        setShow(data.payload.type === "show");
      }
    },
    key: "modal",
  });

  const handleOnClickOutside = React.useCallback((evt) => {
    logger(`Modal > handleOnClickOutside [${name}]`);

    if (allowClose) {
      setShow(false);
    }

    evt.stopPropagation();
    evt.preventDefault();
  }, []);

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Box className="modal modal-open z-50" onClick={handleOnClickOutside}>
        <Box className="modal-box">
          {children}
          <Box row className="modal-action justify-between">
            {secondary && (
              <Box>
                <Button variant="secondary" onClick={secondary.onClick}>
                  {secondary.label}
                </Button>
              </Box>
            )}
            <Box>
              <Button onClick={primary.onClick}>{primary.label}</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>,
    document.body
  );
};
