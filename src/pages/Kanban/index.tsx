// component
import Bread from "@/components/Bread";
import { ListGroup } from "@/components/List";
import PageTitle from "@/components/PageTitle";
import React from "react";
// API
import { useKanbans } from "@/hooks/Kanban";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const KanbanContext = React.createContext<IkanbanContext>({
  tags: [],
  setTags: () => {},
});

const Kanban: React.FC = () => {
  const { kanbanId = "" } = useParams();
  const queryClient = useQueryClient();
  // 目前登入人員
  const user = queryClient.getQueryData(["useAuth"]) as IUser;

  const [tags, setTags] = React.useState<Itag[]>([]);

  // 用目前登入人員 ID 取得該人員所有看板
  const { data: queryKanbans } = useKanbans({
    userId: user._id,
  });
  // 透過 URL 取得 現在的看板
  const kanban: Ikanban = queryKanbans.kanbanMap[kanbanId];

  if (!kanban) return <div />;
  return (
    <KanbanContext.Provider value={{ tags, setTags }}>
      <section className="h-full flex flex-col">
        <Bread />
        <PageTitle className="my-3">{kanban.name}</PageTitle>
        <ListGroup kanbanId={kanbanId} />
      </section>
    </KanbanContext.Provider>
  );
};

export default Kanban;
