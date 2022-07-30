import React from "react";
import { GlobalDataProvider, useDidMount } from "~/shared";

export const AppProviders: React.FC = ({ children }) => {
  const [language, setLanguage] = React.useState("en");

  useDidMount(() => {
    setLanguage(navigator.language);
  });

  return (
    <GlobalDataProvider language={language}>{children}</GlobalDataProvider>
  );
};
