import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { cleanObject, subset } from "./index";

// return the specific param in the URL
export const useUrlQueryParam = <V extends string>(keys: V[]) => {
  const setSearchParams = useSetUrlSearchParam();
  const [searchParams] = useSearchParams();
  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in V]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in V]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    return (params: { [key in string]: unknown }) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    };
  };
};
