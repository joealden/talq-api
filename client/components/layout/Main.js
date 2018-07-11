import React from "react";
import styled from "styled-components";
import constants from "../../utils/constants";

const MainWrapper = styled.main`
  grid-area: "main";
  background-color: white;
  border-left: ${constants.borderVertical};
  display: grid;
`;

const TitleWrapper = styled.div`
  background-color: white;
  border-bottom: ${constants.borderHorizontal};
  height: ${constants.headerHeight};
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 17px;
    font-weight: normal;
  }
`;

/* title prop may need to be reworked when buttons
 * like video call etc. are added to chat page header
 */
const Main = ({ title, children }) => (
  <MainWrapper>
    <TitleWrapper>
      <h1>{title}</h1>
    </TitleWrapper>
    <div>{children}</div>
  </MainWrapper>
);

export default Main;
