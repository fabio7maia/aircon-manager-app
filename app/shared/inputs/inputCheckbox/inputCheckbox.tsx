import React from "react";
import { Form, FormInputApi } from "react-light-form";
import { Box } from "../../";

interface InputCheckboxProps extends FormInputApi {}

export const InputCheckbox: React.FC<InputCheckboxProps> = (props) => {
  return (
    <Form.Input
      {...props}
      render={{
        container: ({
          errorContainerRender,
          inputContainerRender,
          labelContainerRender,
        }) => (
          <Box className="my-4">
            <Box row className="flex align-middle">
              <Box className="pr-4">{labelContainerRender()}</Box>
              <Box>{inputContainerRender()}</Box>
            </Box>
            {errorContainerRender()}
          </Box>
        ),
        inputContainer: (props) => (
          <input {...props} type="checkbox" className="toggle toggle-primary" />
        ),
        labelContainer: ({ name, label }) => (
          <Box as="span" className="label-text">
            {label}
          </Box>
        ),
      }}
    />
  );
};
