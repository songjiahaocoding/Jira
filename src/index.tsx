import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DevTools, loadServer } from "jira-dev-tool";
import { AppProviders } from "context";
import "antd/dist/reset.css";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
