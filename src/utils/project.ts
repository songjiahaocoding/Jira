import { Project } from "../screens/projectList/list";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...res } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return res;
};
