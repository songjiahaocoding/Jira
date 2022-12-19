import "./wdyr";
import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

loadDevTools(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  )
);
