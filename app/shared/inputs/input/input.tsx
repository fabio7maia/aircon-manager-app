import React from "react";
import { Form, FormInputApi } from "react-light-form";

interface InputProps extends FormInputApi {}

export const Input: React.FC<InputProps> = (props) => {
  return <Form.Input {...props} />;
};
