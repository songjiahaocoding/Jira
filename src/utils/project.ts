import { Project } from "../screens/projectList/list";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...res } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [param, client]
  );

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [fetchProjects, run]);

  return res;
};

export const useEditProject = () => {
  const { run, ...asyncRes } = useAsync();
  const client = useHttp();
  const mutate = async (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncRes,
  };
};

export const useAddProject = () => {
  const { run, ...asyncRes } = useAsync();
  const client = useHttp();
  const mutate = async (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncRes,
  };
};
