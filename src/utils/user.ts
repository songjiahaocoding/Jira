import { useHttp } from "./http";
import { User } from "../types/user";
import { useQuery, useQueryClient } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
