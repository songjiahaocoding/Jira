import React, { FormEvent } from "react";
import { useAuth } from "../context/authContext";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();

  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError);
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>User name: {user.name}</div> : null}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input placeholder={"User Name"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input placeholder={"Password"} type="password" id={"password"} />
      </Form.Item>
      <LongButton loading={isLoading} htmlType={"submit"} type="primary">
        Log in
      </LongButton>
    </Form>
  );
};
