import React from "react";
import { Layout, Typography } from "antd";
// component
import Bread from "@/components/Bread";
import { KanbanGroup } from "@/components/Kanban";

const { Title } = Typography;

interface Iprops {
  isShowSider: boolean;
  queryWs: Iworkspace[];
}

const Content: React.FC<Iprops> = ({ queryWs, isShowSider }) => {
  return (
    <Layout.Content
      className={`bg-[#F0F0F0] flex flex-col pt-5 pr-8 ${
        isShowSider ? "pl-5" : "pl-10"
      }`}
    >
      <Bread />
      <Title className="mt-5 mb-7">Overview</Title>
      <section className="overflow-y-auto flex flex-col gap-6 flex-1 p-2">
        {queryWs?.map((workspace) => (
          <KanbanGroup
            key={workspace._id}
            workspace={workspace}
            isShowSider={isShowSider}
          />
        ))}
      </section>
    </Layout.Content>
  );
};

export default Content;
