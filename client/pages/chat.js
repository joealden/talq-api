import React from "react";
import { withRouter } from "next/router";

import Layout from "../components/layout";

const ChatPage = ({ router }) => {
  return (
    <Layout>
      <div>Chat ID: {router.query.id}</div>
    </Layout>
  );
};

export default withRouter(ChatPage);
