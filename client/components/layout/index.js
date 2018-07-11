import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Page = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 20vw) auto;
  grid-template-areas: "sidebar main";
  height: 100%;
`;

const Main = styled.main`
  grid-area: "main";
  background-color: green;
`;

const Layout = ({ children }) => (
  <Page>
    <Sidebar />
    <Main>{children}</Main>
  </Page>
);

export default Layout;
