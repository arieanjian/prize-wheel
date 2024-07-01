import * as AntdIcons from "@ant-design/icons";

import { Button, Col, Divider, Input, Row, Select } from "antd";
import React, { useState } from "react";

import Tag from "@/components/Tag";
import allTagNameSet from "@/components/Tag/TagName";
import colors from "./colors";
// api
import { useAddTag } from "@/hooks/Tag";

interface IProps {
  kanbanId: string;
  tag: Itag | undefined;
  closeTagModal: () => void;
}
// const allIcon = Object.keys(AntdIcons);
const iconsOptions = allTagNameSet.map((icon) => {
  const AntdIcon = AntdIcons[icon as keyof typeof AntdIcons];
  const ValidAntdIcon = AntdIcon as React.ComponentType;
  return {
    label: <ValidAntdIcon />,
    // label: iconComponents[icon],
    value: icon,
  };
});

const TagModal: React.FC<IProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tag, closeTagModal, kanbanId } = props;
  // 判斷是新增 tag 還是編輯 tag
  const type = tag ? "edit" : "create";
  // tag 名稱
  const [name, setName] = useState<string>("");
  // tag background color, text color
  const [color, setColor] = useState<string>("bg-lime-200 text-slate-600");
  // tag icon
  const [icon, setIcon] = useState<keyof typeof AntdIcons>(
    "StepForwardOutlined"
  );

  const addWs_mutation = useAddTag({
    onSuccess: closeTagModal,
  });
  console.log("kanbanId", kanbanId);

  // 新增 or 編輯 tag
  const handleSubmit = () => {
    // closeTagModal();
    addWs_mutation.mutate({
      name,
      icon,
      color,
      kanbanId,
    });
  };

  return (
    <section className="flex flex-col">
      <div className="flex-center h-20 w-full bg-gray-200">
        <Tag size="large" icon={icon} name={name} color={color} />
      </div>

      <Row gutter={[12, 12]}>
        <Col span={8}>
          <div className="mt-5 font-semibold text-gray-600">icon</div>
          <Select
            onChange={(value) => setIcon(value)}
            className="w-full"
            options={iconsOptions}
          />
        </Col>
        <Col span={16}>
          <div className="mt-5 font-semibold text-gray-600">Tag Name</div>
          <Input
            placeholder="type a tag name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
      </Row>
      <Divider />
      <section className="grid grid-cols-5 gap-1">
        {colors.map((color) => (
          <div
            key={color}
            // role="presentation"
            className={`${color} h-7 cursor-pointer rounded-sm transition-all hover:opacity-75`}
            onClick={() => setColor(color)}
          />
        ))}
      </section>

      <Divider />

      <div className="flex justify-end gap-2">
        <Button onClick={closeTagModal}>cancel</Button>
        <Button type="primary" onClick={handleSubmit}>
          {type === "create" ? "create tag" : "edit tag"}
        </Button>
      </div>
    </section>
  );
};

export default TagModal;
