import React from "react";
import { Box, useGlobalData } from "~/shared";
import { PrivateLayout } from "~/layouts";

export default function () {
  const { language } = useGlobalData();

  return (
    <PrivateLayout>
      <Box>Home - {language}</Box>
    </PrivateLayout>
  );
}
