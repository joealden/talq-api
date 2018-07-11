import React from "react";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import constants from "../../utils/constants";

const Page = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 18vw) auto;
  grid-template-areas: "sidebar main";
  height: 100%;
`;

const Main = styled.main`
  grid-area: "main";
  background-color: white;
  border-left: ${constants.borderVertical};

  /* Temp */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Layout = ({ children }) => (
  <Page>
    <Sidebar />
    <Main>{children}</Main>
  </Page>
);

export default Layout;
