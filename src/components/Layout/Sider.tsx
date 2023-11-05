import React, { useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  DoubleLeftOutlined,
  StarOutlined,
  ProjectOutlined,
  PlusCircleFilled,
  ProfileOutlined,
} from "@ant-design/icons";
// component
import { FloatButton, MenuItem } from "../Sider";
import { WsModal } from "@/components/Workspace";
import { KanbanModal } from "../Kanban";

interface Iprops {
  queryWs: Iworkspace[];
  queryKanbans: IqueryKanbans;
  isShowSider: boolean;
  setIsShowSider: ISetStateFunction<boolean>;
}

const Sider: React.FC<Iprops> = (props) => {
  const { queryWs, queryKanbans, isShowSider, setIsShowSider } = props;

  const [s_isOpen, set_s_isOpen] = useState(false);
  const [isOpenKanban, setIsOpenKanban] = useState(false);
  const [workspaceId, setWorkspaceId] = useState(""); // 建立 kanban 時讓後端知道要建在哪個 workspace

  const [s_selectedKeys, set_s_selectedKeys] = useState<string[]>([]);

  const item_basic: MenuProps["items"] = [
    {
      key: "noSelect_overview",
      label: (
        <div className="flex justify-between">
          <span>Overview</span>
          <DoubleLeftOutlined onClick={() => setIsShowSider(false)} />
        </div>
      ),
      icon: <AppstoreOutlined />,
    },
    {
      key: "Favorite_page_noSelect",
      label: "Favorite page",
      icon: <StarOutlined />,
      // children: [
      //   {
      //     key: "Design team1",
      //     label: (
      //       <MenuItem
      //       kanbanInfo={{
      //           _id: "1",
      //           workspaceId: "1",
      //           boardName: "Design team",
      //           isPinned: false,
      //           owner: "Ariean",
      //           memberIds: ["aaa"],
      //         }}
      //       />
      //     ),
      //     icon: <ProjectOutlined />,
      //   },
      //   {
      //     key: "Design team2",
      //     label: (
      //       <MenuItem
      //         board={{
      //           _id: "2",
      //           workspaceId: "2",
      //           boardName: "Design team2",
      //           isPinned: true,
      //           owner: "Ariean",
      //           memberIds: ["aaa"],
      //         }}
      //       />
      //     ),
      //     icon: <ProjectOutlined />,
      //   },
      // ],
    },
    {
      key: "noSelect_create",
      label: "create workspace",
      className: "text-[#7D7D7D]",
      icon: <PlusCircleFilled />,
      onClick: () => set_s_isOpen(true),
    },
    { type: "divider" },
  ];

  const generateKanbans = (kanbanIds: string[], workspaceId: string) => {
    const kanbans: MenuProps["items"] =
      kanbanIds?.map((kanbanId) => {
        return {
          key: kanbanId,
          label: <MenuItem kanban={queryKanbans.kanbanMap[kanbanId]} />,
          icon: <ProjectOutlined />,
        };
      }) || [];

    const createKanban = {
      key: `${workspaceId}_noSelect`,
      className: "text-[#7D7D7D]",
      onClick: () => {
        setIsOpenKanban(true);
        setWorkspaceId(workspaceId);
      },
      label: (
        <div>
          <span>Create kanban</span>
        </div>
      ),
      icon: <PlusCircleFilled />,
    };

    kanbans.push(createKanban);

    return kanbans;
  };

  const item_workspaces: MenuProps["items"] = queryWs?.map((workspace) => {
    const kanbans: MenuProps["items"] = generateKanbans(
      workspace.kanbanIds,
      workspace._id
    );

    return {
      key: workspace._id,
      label: workspace.name,
      icon: <ProfileOutlined />,
      children: kanbans,
    };
  });

  return (
    <>
      {!isShowSider && <FloatButton setIsShowSider={setIsShowSider} />}
      <Layout.Sider
        className="border-solid border-0 border-r border-[#d8d7d7] bg-[#F0F0F0] overflow-auto"
        width={isShowSider ? 255 : 0}
      >
        <Menu
          mode="inline"
          className="sider"
          items={item_basic.concat(item_workspaces)}
          selectedKeys={s_selectedKeys}
          onClick={(props) => {
            if (!props.key.includes("noSelect")) {
              set_s_selectedKeys([props.key]);
            }
          }}
        />
      </Layout.Sider>

      <WsModal isOpen={s_isOpen} closeWsModal={() => set_s_isOpen(false)} />

      <KanbanModal
        isOpen={isOpenKanban}
        workspaceId={workspaceId}
        closeKanbanModal={() => {
          setIsOpenKanban(false);
          setWorkspaceId("");
        }}
      />
    </>
  );
};

export default Sider;
