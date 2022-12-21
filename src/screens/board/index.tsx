import React from "react";
import { useDocumentTitle } from "../../utils";
import { useBoards } from "../../utils/board";
import { useBoardSearchParams, useProjectInUrl } from "./util";
import { BoardColumn } from "./boardColumn";
import styled from "@emotion/styled";
import { SearchPanel } from "./searchPanel";

export const Board = () => {
  useDocumentTitle("Board");

  const { data: boards } = useBoards(useBoardSearchParams());
  const { data: currrentProject } = useProjectInUrl();

  return (
    <div>
      <h1>{currrentProject?.name} Board</h1>
      <SearchPanel />
      <ColumnsContainer>
        {boards?.map((board) => (
          <BoardColumn board={board} key={board.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
