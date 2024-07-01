import { Form, FormInstance, Select, SelectProps, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";

import { KanbanContext } from "@/pages/Kanban";
import { PlusCircleOutlined } from "@ant-design/icons";
import Tag from "@/components/Tag";
// component
import TagModal from "@/components/TagModal";
import { useParams } from "react-router-dom";

export interface IProps {
  card: Icard | undefined;
  form: FormInstance<Icard>;
}

const { Title, Text } = Typography;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Setting: React.FC<IProps> = ({ card, form }) => {
  const { tags } = useContext(KanbanContext);
  const { kanbanId = "" } = useParams();
  const [tagOptions, setTagOptions] = useState<SelectProps["options"]>([]);
  const [showTagModal, setShowTagModal] = useState<boolean>(false);

  useEffect(() => {
    if (tags.length === 0) return;
    const options =
      tags?.map((tag) => ({
        data: tag,
        label: (
          <Tag size="small" name={tag.name} color={tag.color} icon={tag.icon} />
        ),
        value: tag.id,
      })) || [];
    setTagOptions(options);
  }, [tags]);

  const tagRender: SelectProps["tagRender"] = (props) => {
    // 從 props 中解構出 label，因為我們在 options 中已經定義了 label
    const { label } = props;
    return <span className="mr-1">{label}</span>;
  };
  return (
    <section className="flex flex-col">
      <Title level={3} className="text-[rgb(125,125,125)] mb-2">
        Setting
      </Title>
      <div className="flex gap-2 items-end">
        <Form.Item
          label={<Text strong>Tags</Text>}
          name="tags"
          className="m-0 flex-1"
        >
          <Select
            placeholder="place select tags"
            mode="tags"
            tagRender={tagRender}
            options={tagOptions}
          />
        </Form.Item>
        <PlusCircleOutlined
          className="text-2xl mb-1 cursor-pointer"
          onClick={() => setShowTagModal(true)}
        />
      </div>

      <TagModal
        kanbanId={kanbanId}
        showTagModal={showTagModal}
        setShowTagModal={setShowTagModal}
      />
    </section>
  );
};

export default Setting;
