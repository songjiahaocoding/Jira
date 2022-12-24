import React, { useCallback } from "react";
import { useDocumentTitle } from "../../utils";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./kanbanColumn";
import styled from "@emotion/styled";
import { SearchPanel } from "./searchPanel";
import { ScreenContainer } from "../../components/lib";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./createKanban";
import { TaskModal } from "./taskModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/dragDropContext";

export const Kanban = () => {
  useDocumentTitle("Board");
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { data: currrentProject } = useProjectInUrl();

  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currrentProject?.name} Board</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    draggableId={"kanban" + kanban.id}
                    key={kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // Board reorder
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      // Task reorder
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

const ColumnsContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
