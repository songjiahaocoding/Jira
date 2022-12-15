import React, { FormEvent } from "react";
import { useAuth } from "../context/authContext";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
      <LongButton htmlType={"submit"} type="primary">
        Log in
      </LongButton>
    </Form>
  );
};
