import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "error" | "loading" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

export const useAsync = <T>(initialState?: State<T>) => {
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: T) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("Please input the data of type Promise");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
