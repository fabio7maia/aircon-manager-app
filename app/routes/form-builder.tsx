import React from "react";
import { PrivateLayout } from "~/layouts";
import { Box, FormBuilder, useGlobalData } from "~/shared";

export default function () {
  const { language } = useGlobalData();

  return (
    <PrivateLayout>
      <Box>Form Builder - {language}</Box>
      <FormBuilder
        fields={[
          {
            name: "name",
            type: "text",
            placeholder: "Name",
          },
          {
            name: "email",
            type: "email",
            placeholder: "Email",
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
          },
          {
            name: "password-confirm",
            type: "password",
            placeholder: "Password confirm",
          },
        ]}
      />
    </PrivateLayout>
  );
}
