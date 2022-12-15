import React from "react";
import "./App.css";
import { useAuth } from "./context/authContext";
import { AuthenticatedApp } from "./authenticatedApp";
import { UnauthenticatedApp } from "./unauthenticatedApp";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
