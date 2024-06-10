import React, { useState } from "react";

// component
import CardModal from "@/components/Card/CardModal";
import { PlusOutlined } from "@ant-design/icons";

interface IProps {
  listId: string;
}

const AddCardButton: React.FC<IProps> = ({ listId }) => {
  // 是否顯示新增 Card 的 Modal
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  // console.log("AddCardButton render");
  return (
    <>
      <div className="flex justify-between gap-3 py-2 rounded-md transition-all hover:bg-zinc-300">
        <PlusOutlined />
        <span
          className="flex-1 flex justify-start cursor-pointer"
          onClick={() => setIsShowModal(true)}
        >
          Add Card
        </span>
      </div>
      <CardModal
        listId={listId}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </>
  );
};

export default AddCardButton;
