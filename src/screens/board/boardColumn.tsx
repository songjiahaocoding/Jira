import React from "react";
import { Board } from "../../types/board";
import { useTasks } from "../../utils/task";
import { useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/taskType";
import TaskIcon from "../../assets/task";
import BugIcon from "../../assets/bug";
import styled from "@emotion/styled";
import { Card } from "antd";
import exp from "constants";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return name === "task" ? TaskIcon() : BugIcon();
};

export const BoardColumn = ({ board }: { board: Board }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === board.id);
  return (
    <Container>
      <h3>{board.name}</h3>
      {tasks?.map((task) => (
        <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
          <div>{task.name}</div>
          <TaskTypeIcon id={task.typeId} />
        </Card>
      ))}
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem; ;
`;
const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
