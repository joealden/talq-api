import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";

const SettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingsPage = () => (
  <Layout mainTitle="Settings">
    <SettingsWrapper>Settings Page</SettingsWrapper>
  </Layout>
);

export default SettingsPage;
