import React from "react";
import { PrivateLayout } from "~/layouts";
import { Box, PageBuilder, useGlobalData } from "~/shared";

export default function () {
  const { language } = useGlobalData();

  return (
    <PrivateLayout>
      <Box>Form Builder - {language}</Box>
      <PageBuilder
        blocks={[
          {
            type: "box",
            blocks: [
              {
                type: "box",
                children: "Content",
              },
              {
                type: "box",
                children: "Content 2",
              },
            ],
          },
          {
            type: "form",
            fields: [
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
            ],
          },
        ]}
      />
    </PrivateLayout>
  );
}
