import React from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { PublicLayout } from "~/layouts";
import {
  InputEmail,
  InputPassword,
  InputText,
  Box,
  Button,
  InputCheckbox,
  useGlobalData,
  useLogger,
  Typography,
  useDidMount,
} from "~/shared";
import { useFetchLogin } from "~/services";

export default function () {
  const { language, setUser } = useGlobalData();
  const logger = useLogger();
  // const fetch = useFetchLogin();

  const handleOnClickSubmit = React.useCallback(() => {
    logger("DEBUG > PublicLayout > Login > handleOnClickSubmit");

    setUser({ id: "user-test" });
  }, []);

  // useDidMount(() => {
  //   // fetch().then((res) =>
  //   //   logger("DEBUG > PublicLayout > Login > fetch", { res })
  //   // );
  // });

  return (
    <PublicLayout blocks={{ all: false }}>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <Typography
              as="h2"
              extraBold
              className="mt-6 text-center text-gray-900"
              // className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            >
              Sign in to your account
            </Typography>
            <Typography
              as="p"
              className="mt-2 text-center text-gray-600"
              // className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            >
              Or{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </Typography>
          </div>
          {/* <form className="mt-8 space-y-6" action="#" method="POST"> */}
          <Box className="rounded-md shadow-sm -space-y-px">
            <InputEmail
              label="Email address"
              name="email"
              placeholder="Email address"
              autoComplete="email"
              required
            />

            <InputPassword
              label="Password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
            />

            <Box row className="flex items-center justify-between">
              <InputCheckbox name="rememberMe" label="Remember me" />

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </Box>
          </Box>

          <Box>
            <Button
              onClick={handleOnClickSubmit}
              icons={{
                left: (
                  <LockClosedIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                ),
              }}
            >
              Sign in
            </Button>
          </Box>
          {/* </form> */}
        </div>
      </div>
    </PublicLayout>
  );
}
