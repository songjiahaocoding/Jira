import React from "react";
import "./App.css";
import { useAuth } from "./context/authContext";
import { AuthenticatedApp } from "./authenticatedApp";
import { UnauthenticatedApp } from "./unauthenticatedApp";
import { ErrorBoundary } from "./components/errorBoundary";
import { FullPageErrorFallback } from "./components/lib";
import { useDocumentTitle } from "./utils";

function App() {
  const { user } = useAuth();

  useDocumentTitle("Jira");

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
