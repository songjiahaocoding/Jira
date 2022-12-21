import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { User } from "../types/user";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...res } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);

  return res;
};
