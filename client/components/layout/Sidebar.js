import React from "react";
import styled from "styled-components";

import Toolbar from "./Toolbar";
import constants from "../../utils/constants";

/* TEMP */ import ListLengthTest from "../../utils/ListLengthTest";

const ChatListWrapper = styled.nav`
  height: calc(100vh - ${constants.headerHeight});
  overflow: auto;
`;

// TODO: Add search icon inside box like messenger
const searchBoxMargin = 12;
const SearchBox = styled.input`
  margin: ${searchBoxMargin}px;
  width: calc(100% - ${searchBoxMargin * 2}px);
  height: 35px;
  padding: 10px;
  font-size: 14px;
  background-color: #f5f6f7;
  border: none;
  border-radius: 5px;
`;

const ChatList = () => (
  <ChatListWrapper>
    <SearchBox
      type="text"
      placeholder="Search Talq"
      spellCheck="false"
      autoComplete="off"
    />
    <ul>{/* Implement when API has been fleshed out */}</ul>
    <ListLengthTest />
  </ChatListWrapper>
);

const SidebarWrapper = styled.div`
  grid-area: "sidebar";
  height: 100%;
`;

const Sidebar = () => (
  <SidebarWrapper>
    <Toolbar />
    <ChatList />
  </SidebarWrapper>
);

export default Sidebar;
