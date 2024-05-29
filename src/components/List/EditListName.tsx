import React, { useState } from "react";

// API
import { useChangeListName } from "@/hooks/List";

interface IProps {
  list: Ilist;
  setIsEdit: ISetStateFunction<boolean>;
}

type InputEvent =
  | React.KeyboardEvent<HTMLInputElement>
  | React.FocusEvent<HTMLInputElement>;

const EditListName: React.FC<IProps> = ({ list, setIsEdit }) => {
  const { mutate } = useChangeListName();
  const [listName, setListName] = useState<string>(list.name);
  // 判斷是否是 keydown enter 或 blur 事件
  const isEnterOrBlur = (event: InputEvent) => {
    // blur 事件
    if (event.type === "blur") return true;
    // keydown 事件
    if ((event as React.KeyboardEvent<HTMLInputElement>).key === "Enter") {
      return true;
    }
  };
  // onblue or keydown enter 執行
  const handleEditListName = (event: InputEvent) => {
    // 如果不是 keydown enter 或 blur 事件就 return
    if (!isEnterOrBlur(event)) return;

    setIsEdit(false);
    // 如果 listName 沒有改變就不 call api
    if (listName === list.name) return;
    mutate({ id: list.id, name: listName });
  };

  return (
    <input
      autoFocus
      defaultValue={list.name}
      className={`w-full h-6 rounded-md 
      border-2 border-solid border-[#FF4D4F]
      outline-none
      `}
      onBlur={handleEditListName}
      onKeyDown={handleEditListName}
      onChange={(e) => setListName(e.target.value)}
    />
  );
};

export default EditListName;
