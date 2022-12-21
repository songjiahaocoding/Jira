import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Board } from "../types/board";

export const useBoards = (param?: Partial<Board>) => {
  const client = useHttp();

  return useQuery<Board[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
