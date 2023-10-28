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
import { FloatButton, MenuBoard } from "../Sider";
import { WsModal } from "@/components/Workspace/index";

interface Iprops {
  queryWs: Iworkspace[];
  isShowSider: boolean;
  setIsShowSider: ISetStateFunction<boolean>;
}

const Sider: React.FC<Iprops> = (props) => {
  const { queryWs, isShowSider, setIsShowSider } = props;

  const [s_isOpen, set_s_isOpen] = useState(false);

  const [s_selectedKeys, set_s_selectedKeys] = useState<string[]>([]);

  console.log("queryWs = ", queryWs);

  const items: MenuProps["items"] = [
    {
      key: "noSelect1",
      label: (
        <div className="flex justify-between">
          <span>Overview</span>
          <DoubleLeftOutlined onClick={() => setIsShowSider(false)} />
        </div>
      ),
      icon: <AppstoreOutlined />,
    },
    {
      key: "Favorite page",
      label: "Favorite page",
      icon: <StarOutlined />,
      children: [
        {
          key: "Design team1",
          label: (
            <MenuBoard
              board={{
                _id: "1",
                workspaceId: "1",
                boardName: "Design team",
                isPinned: false,
                owner: "Ariean",
                memberIds: ["aaa"],
              }}
            />
          ),
          icon: <ProjectOutlined />,
        },
        {
          key: "Design team2",
          label: (
            <MenuBoard
              board={{
                _id: "2",
                workspaceId: "2",
                boardName: "Design team2",
                isPinned: true,
                owner: "Ariean",
                memberIds: ["aaa"],
              }}
            />
          ),
          icon: <ProjectOutlined />,
        },
      ],
    },
    {
      key: "noSelect2",
      label: "create workspace",
      className: "text-[#7D7D7D]",
      icon: <PlusCircleFilled />,
      onClick: () => set_s_isOpen(true),
    },
    { type: "divider" },

    {
      key: "Company1",
      label: "Company1",
      icon: <ProfileOutlined />,
      children: [
        {
          key: "Company1-1",
          label: (
            <MenuBoard
              board={{
                _id: "1",
                workspaceId: "1",
                boardName: "Company 1-1",
                isPinned: false,
                owner: "Ariean",
                memberIds: ["aaa"],
              }}
            />
          ),
          icon: <ProjectOutlined />,
        },
        {
          key: "Company1-2",
          label: (
            <MenuBoard
              board={{
                _id: "2",
                workspaceId: "2",
                boardName: "Company 1-2",
                isPinned: true,
                owner: "Ariean",
                memberIds: ["aaa"],
              }}
            />
          ),
          icon: <ProjectOutlined />,
        },
        {
          key: "noSelect3",
          className: "text-[#7D7D7D]",
          label: (
            <div
            // className="flex pl-7 py-4 gap-3 text-md text-[#7D7D7D] cursor-pointer"
            // onClick={() => alert(123)}
            >
              <span>Create board</span>
            </div>
          ),
          icon: <PlusCircleFilled />,
        },
      ],
    },
    {
      key: "Company2",
      label: "Company2",
      icon: <ProfileOutlined />,
      children: [
        {
          key: "Company2-1",
          label: (
            <MenuBoard
              board={{
                _id: "1",
                workspaceId: "1",
                boardName: "Company 2-1",
                isPinned: false,
                owner: "Ariean",
                memberIds: ["aaa"],
              }}
            />
          ),
          icon: <ProjectOutlined />,
        },
        {
          key: "Company2-2",
          label: (
            <MenuBoard
              board={{
                _id: "2",
                workspaceId: "2",
                boardName: "Company 2-2",
                isPinned: true,
                owner: "Ariean",
                memberIds: ["aaa"],
              }}
            />
          ),
          icon: <ProjectOutlined />,
        },
        {
          key: "noSelect4",
          className: "text-[#7D7D7D]",
          label: (
            <div
            // className="flex pl-7 py-4 gap-3 text-md text-[#7D7D7D] cursor-pointer"
            // onClick={() => alert(123)}
            >
              <span>Create board</span>
            </div>
          ),
          icon: <PlusCircleFilled />,
        },
      ],
    },
  ];

  return (
    <>
      {!isShowSider && <FloatButton setIsShowSider={setIsShowSider} />}
      <Layout.Sider
        className="border-solid border-0 border-r border-[#d8d7d7] bg-[#F0F0F0]"
        width={isShowSider ? 255 : 0}
      >
        <Menu
          mode="inline"
          className="sider"
          items={items}
          selectedKeys={s_selectedKeys}
          onClick={(props) => {
            if (!props.key.includes("noSelect")) {
              set_s_selectedKeys([props.key]);
            }
          }}
        />
      </Layout.Sider>

      <WsModal isOpen={s_isOpen} closeWsModal={() => set_s_isOpen(false)} />
    </>
  );
};

export default Sider;
