import React, { useState } from "react";
import { ProjectListScreen } from "./screens/projectList";
import { useAuth } from "./context/authContext";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, MenuProps } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "./screens/projectList/projectModal";
import { ProjectPopOver } from "./components/projectPopOver";

export const AuthenticatedApp = () => {
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding type={"link"} onClick={() => setProjectOpen(true)}>
            Create Project
          </ButtonNoPadding>
        }
      />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      type={"link"}
                      onClick={() => setProjectOpen(true)}
                    >
                      Create Project
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path="*" element={<Navigate replace to="projects" />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectOpen={projectOpen}
        title={"Project Modal"}
        close={() => setProjectOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Button type={"link"} onClick={logout}>
          Log out
        </Button>
      ),
    },
  ];
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopOver {...props} />
        <span>Users</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

const Header = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled(Row)``;

const Main = styled.main``;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  height: 100vh;
`;
