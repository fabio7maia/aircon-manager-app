export type TClassNameOptions = {
  replace?: boolean;
};

export type TClassName =
  | string
  | {
      className: string;
      options?: TClassNameOptions;
    };
