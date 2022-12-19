import React, { useState } from "react";
import { Modal } from "antd";

export const ProjectModal = (props: {
  projectOpen: boolean;
  title: string;
  close: () => void;
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOK = () => {};

  return (
    <Modal
      open={props.projectOpen}
      title={props.title}
      onOk={handleOK}
      confirmLoading={confirmLoading}
      onCancel={props.close}
    ></Modal>
  );
};
