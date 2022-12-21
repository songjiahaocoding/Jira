import React from "react";
import { IdSelect } from "./idSelect";
import { useTaskTypes } from "../utils/taskType";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskType } = useTaskTypes();

  return <IdSelect options={taskType || []} {...props}></IdSelect>;
};
