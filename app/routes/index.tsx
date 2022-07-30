import { useNavigate } from "remix";
import { routes } from "~/constants";
import { useDidMount, useIsUserLogged } from "~/shared";

export default function () {
  const isUserLogged = useIsUserLogged();
  const navigate = useNavigate();

  useDidMount(() => {
    const redirectRoute = isUserLogged ? routes.home : routes.login;

    navigate(redirectRoute);
  });

  return null;
}
