import { useMemo } from "react";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";
import { useEditProject, useProject } from "../../utils/project";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectQueryKey = () => {
  const [param] = useProjectsSearchParams();
  return ["projects", param];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editProjectId }, setEditProjectId] = useUrlQueryParam([
    "editProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProject(Number(editProjectId));

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editProjectId: "" });
  const startEdit = (id: number) => setEditProjectId({ editProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
