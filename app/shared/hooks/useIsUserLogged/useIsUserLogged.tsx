import { useGlobalData } from "../useGlobalData";
import { useLogger } from "../useLogger";

export const useIsUserLogged = () => {
  const { user } = useGlobalData();
  const logger = useLogger();

  logger("DEBUG > useIsUserLogged", {
    user,
  });

  return user !== undefined;
};
