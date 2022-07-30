import React from "react";
import { Form, FormInputApi } from "react-light-form";

interface InputEmailProps extends FormInputApi {}

export const InputEmail: React.FC<InputEmailProps> = (props) => {
  return <Form.Input {...props} type="email" />;
};
