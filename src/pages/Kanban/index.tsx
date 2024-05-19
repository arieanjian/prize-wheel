import React from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
// component
import Bread from "@/components/Bread";
import PageTitle from "@/components/PageTitle";
import { ListGroup } from "@/components/List";
// API
import { useKanbans } from "@/hooks/Kanban";


const Kanban: React.FC = () => {
  const { kanbanId = "" } = useParams();
  const queryClient = useQueryClient();
  // 目前登入人員
  const user = queryClient.getQueryData(["useAuth"]) as IUser;
  // 用目前登入人員 ID 取得該人員所有看板
  const { data: queryKanbans } = useKanbans({
    userId: user._id,
  });
  // 透過 URL 取得 現在的看板
  const kanban: Ikanban = queryKanbans.kanbanMap[kanbanId];
  
  if (!kanban) return <div />;
  return (
    <section className="h-full flex flex-col">
      <Bread />
      <PageTitle className="my-3">{kanban.name}</PageTitle>
      {/* <div>workspaceId: {workspaceId}</div>
      <div>kanbanId: {kanbanId}</div> */}
      <ListGroup kanbanId={kanbanId} />
    </section>
  );
};

export default Kanban;
