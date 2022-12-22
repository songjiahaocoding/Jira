import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useTasksModal, useTasksQueryKey } from "./util";
import { Button, Form, Input, Modal } from "antd";
import { useDeleteTask, useEditTask } from "utils/task";
import { UserSelect } from "../../components/userSelect";
import { TaskTypeSelect } from "../../components/taskTypeSelect";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "Confirm",
      cancelText: "Cancel",
      title: "Are you sure to delete this task?",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      okText={"Confirm"}
      cancelText={"Cancel"}
      confirmLoading={editLoading}
      title={"Task Edit"}
      onCancel={onCancel}
      onOk={onOk}
      open={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"Person Name"}
          name={"name"}
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"Transactor"} name={"processorId"}>
          <UserSelect defaultOptionName={"Transactor"} />
        </Form.Item>
        <Form.Item label={"Task Type"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          onClick={startDelete}
          style={{ fontSize: "14px" }}
          size={"small"}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
