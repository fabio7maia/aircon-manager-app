import React from "react";
import { Form, FormInputApi } from "react-light-form";

interface InputPasswordProps extends FormInputApi {}

export const InputPassword: React.FC<InputPasswordProps> = (props) => {
  return <Form.Input {...props} type="password" />;
};
