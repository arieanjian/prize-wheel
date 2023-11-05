import React, { useState } from "react";
import { Layout } from "antd";
import { useQueryClient } from "@tanstack/react-query";
// component
import Sider from "@/components/Layout/Sider";
import Content from "@/components/Layout/Content";
// API
import { useWsByUserId } from "@/hooks/Workspace";
import { useKanbans } from "@/hooks/Kanban";

const Workspace: React.FC = () => {
  const queryClient = useQueryClient();
  const [isShowSider, setIsShowSider] = useState(true);

  const user = queryClient.getQueryData(["useAuth"]) as IUser;

  const { data: queryWs } = useWsByUserId({
    userId: user._id,
  });

  const { data: queryKanbans } = useKanbans({
    userId: user._id,
  });

  return (
    <Layout className="h-[calc(100vh_-_80px)]">
      <Sider
        queryWs={queryWs}
        queryKanbans={queryKanbans}
        isShowSider={isShowSider}
        setIsShowSider={setIsShowSider}
      />
      <Content isShowSider={isShowSider} queryWs={queryWs} />
    </Layout>
  );
};

export default Workspace;
