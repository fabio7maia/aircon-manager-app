import React from "react";
import { Form, FormInputApi } from "react-light-form";
import { defaultInputClassNames } from "../consts";

interface InputTextareaProps extends FormInputApi {}

export const InputTextarea: React.FC<InputTextareaProps> = (props) => {
  return (
    <Form.Input
      {...props}
      render={{
        inputContainer: (props) => (
          <textarea
            {...props}
            className={`textarea ${defaultInputClassNames}`}
          />
        ),
      }}
    />
  );
};
