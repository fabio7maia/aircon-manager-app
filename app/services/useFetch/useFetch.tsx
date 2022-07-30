import React from "react";
import { AppApi } from "../__genApi__";

const apiUrl = process.env.API_URL;

interface UseFetchInput<TInputFetch extends () => Promise<any>> {
  fetch: TInputFetch;
}

export const useFetch = <
  TInput,
  TOutput,
  TInputFetch extends () => Promise<TOutput>
>({
  fetch,
}: UseFetchInput<TInputFetch>) => {
  const api = new AppApi(undefined, apiUrl);

  return React.useMemo(
    () => ({
      fetch,
    }),
    [api]
  );
};
