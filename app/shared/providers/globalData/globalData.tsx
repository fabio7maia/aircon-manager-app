import React from "react";
import { useNavigate } from "remix";
import { routes } from "~/constants";
import { useForceUpdate, useLocalStorage, useLogger } from "../../hooks";

interface GlobalDataProps {
  language: string;
}

export type TUser = {
  id: string;
};

export type TGlobalDataContext = {
  language: string;
  user?: TUser;
  setLanguage: (language: string) => void;
  setUser: (user: TUser) => void;
};

const initialGlobalDataContext: TGlobalDataContext = {
  language: "pt",
  user: undefined,
  setLanguage: () => {},
  setUser: () => {},
};

export const globalDataContext = React.createContext(initialGlobalDataContext);

export const GlobalDataProvider: React.FC<GlobalDataProps> = ({
  language: browserLanguage,
  children,
}) => {
  const forceUpdate = useForceUpdate();
  const { get, set } = useLocalStorage<{ user?: TUser; language: string }>(
    "puzzle-framework-global-data",
    { language: browserLanguage }
  );
  const { user, language = "en" } = get() || {};
  const navigate = useNavigate();
  const logger = useLogger();

  const treatRedirectBasedOnUser = React.useCallback((user?: TUser) => {
    const redirectRoute = user ? routes.home : routes.login;

    logger("DEBUG > GlobalDataProvider > treatRedirectBasedOnUser", {
      user,
      redirectRoute,
    });

    navigate(redirectRoute);
  }, []);

  const handleSetLanguage = React.useCallback((language: string) => {
    set({
      ...(get() || {}),
      language,
    });
  }, []);

  const handleSetUser = React.useCallback((user?: TUser) => {
    set({
      language,
      ...(get() || {}),
      ...({ user } || {}),
    });

    forceUpdate();

    setTimeout(() => treatRedirectBasedOnUser(user), 500);
  }, []);

  const providerValue = React.useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      setUser: handleSetUser,
      user,
    }),
    [language, user, handleSetLanguage, handleSetUser]
  );

  logger("DEBUG > GlobalDataProvider", {
    providerValue,
  });

  return (
    <globalDataContext.Provider value={providerValue}>
      {children}
    </globalDataContext.Provider>
  );
};
