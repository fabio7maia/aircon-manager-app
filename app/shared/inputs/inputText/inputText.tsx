import React from "react";
import { Form, FormInputApi } from "react-light-form";

interface InputTextProps extends FormInputApi {}

export const InputText: React.FC<InputTextProps> = (props) => {
  return <Form.Input {...props} type="text" />;
};
