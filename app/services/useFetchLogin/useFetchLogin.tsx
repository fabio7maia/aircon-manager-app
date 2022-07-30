import React from "react";
import { useFetch } from "../useFetch";
import { AppApi, Configuration } from "../__genApi__";

export const useFetchLogin = () => {
  return useFetch({
    fetch: () => {
      return Promise.resolve();
    },
  });
};
