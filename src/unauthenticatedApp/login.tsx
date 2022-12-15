import React, { FormEvent } from "react";
import { useAuth } from "../context/authContext";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>User name: {user.name}</div> : null}
      <div>
        <label htmlFor="username">User name</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" id={"password"} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
