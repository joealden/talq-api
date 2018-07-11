import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

import constants from "../../utils/constants";
import SettingsIcon from "../icons/SettingsIcon";
import NewChatIcon from "../icons/NewChatIcon";

const ToolbarWrapper = styled.div`
  background-color: white;
  border-bottom: ${constants.border};
  height: ${constants.headerHeight};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-size: 20px;
    font-weight: normal;
  }
`;

const iconStyles = css`
  color: ${constants.color};
  height: 46px;
  width: 46px;
  stroke-width: 1.2px;
  padding: 6px;
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  ${iconStyles};
`;
const StyledNewChatIcon = styled(NewChatIcon)`
  ${iconStyles};
`;

const Toolbar = () => (
  <ToolbarWrapper>
    <Link href="/settings">
      <a>
        <StyledSettingsIcon />
      </a>
    </Link>
    <h1>Talq</h1>
    <Link href="/new">
      <a>
        <StyledNewChatIcon />
      </a>
    </Link>
  </ToolbarWrapper>
);

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
