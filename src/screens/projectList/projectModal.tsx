import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useProjectModal, useProjectQueryKey } from "./util";
import { UserSelect } from "../../components/userSelect";
import { useAddProject, useEditProject } from "../../utils/project";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "../../components/lib";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectQueryKey());
  const [form] = useForm();
  const onFinish = (formVal: any) => {
    mutateAsync({ ...editingProject, ...formVal }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? "Edit Project" : "Add Project";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Modal
      open={projectModalOpen}
      confirmLoading={confirmLoading}
      onCancel={closeModal}
      forceRender={true}
      footer={null}
    >
      {isLoading ? (
        <Spin size={"large"}>:</Spin>
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout={"vertical"}
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label={"Name"}
              name={"name"}
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder={"Please enter the name for the project"} />
            </Form.Item>
            <Form.Item
              label={"Department"}
              name={"organization"}
              rules={[
                { required: true, message: "Please enter the department" },
              ]}
            >
              <Input placeholder={"Please enter the department"} />
            </Form.Item>
            <Form.Item label={"Supervisor"} name={"personId"}>
              <UserSelect defaultOptionName={"Supervisor"} />
            </Form.Item>
            <Form.Item>
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
};
