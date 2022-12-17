import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Board } from "../board";
import { Epic } from "../epic";
import { BrowserRouter as Router } from "react-router-dom";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to={"board"}>Board</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/board"} element={<Board />} />
        <Route path={"/epic"} element={<Epic />} />
        <Route path="*" element={<Navigate replace to="board" />} />
      </Routes>
    </div>
  );
};
