import React from "react";
import styled from "styled-components";

import Toolbar from "./Toolbar";

const SidebarWrapper = styled.div`
  grid-area: "sidebar";
  background-color: yellow;
  height: 100%;
`;

const Sidebar = () => (
  <SidebarWrapper>
    <Toolbar />
  </SidebarWrapper>
);

export default Sidebar;
