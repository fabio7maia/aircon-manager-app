import React from "react";
import { Form, FormInputApi } from "react-light-form";
import { defaultInputClassNames } from "../consts";

interface InputSelectProps extends FormInputApi {
  items: string[];
}

export const InputSelect: React.FC<InputSelectProps> = (props) => {
  const { items, placeholder, label } = props;

  return (
    <Form.Input
      {...props}
      render={{
        inputContainer: () => (
          <select className={`select ${defaultInputClassNames}`}>
            <option disabled selected>
              {placeholder || label}
            </option>
            {items.map((item) => (
              <option>{item}</option>
            ))}
          </select>
        ),
        labelContainer: () => <></>,
      }}
    />
  );
};
