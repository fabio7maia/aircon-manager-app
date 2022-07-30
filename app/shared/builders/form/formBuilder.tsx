import React from "react";
import { FormInputApi } from "react-light-form";
import { Input } from "~/shared";

interface FormBuilderProps {
  fields: FormInputApi[];
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ fields = [] }) => {
  return (
    <form>
      {fields.map((field) => (
        <Input {...field} />
      ))}
    </form>
  );
};
