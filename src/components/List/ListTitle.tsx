import React, { useState } from "react";

// component
import EditListName from "./EditListName";
import { MoreOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title, Text } = Typography;

interface IProps {
  list: Ilist;
}

const ListTitle: React.FC<IProps> = ({ list }) => {
  // 是否編輯 list 名稱
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <section className="flex flex-col">
      <div className="flex justify-between cursor-pointer">
        {isEdit ? (
          <EditListName list={list} setIsEdit={setIsEdit} />
        ) : (
          <Title
            level={5}
            className="flex-1 cursor-pointer"
            onClick={() => setIsEdit(true)}
          >
            {list.name}
          </Title>
        )}

        <MoreOutlined
          rotate={90}
          className="text-xl transition-all duration-[400ms] hover:scale-125"
        />
      </div>
      <Text type="secondary">2 cards</Text>
    </section>
  );
};

export default ListTitle;
