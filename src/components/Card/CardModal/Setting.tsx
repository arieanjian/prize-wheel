import { Form, FormInstance, Select, Typography } from "antd";
import React, { useState } from "react";

import { PlusCircleOutlined } from "@ant-design/icons";
// component
import TagModal from "@/components/TagModal";

export interface IProps {
  card: Icard | undefined;
  form: FormInstance<Icard>;
}
const { Title, Text } = Typography;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Setting: React.FC<IProps> = ({ card, form }) => {
  const [showTagModal, setShowTagModal] = useState<boolean>(false);
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
          <Select placeholder="place select tags" />
        </Form.Item>
        <PlusCircleOutlined
          className="text-2xl mb-1 cursor-pointer"
          onClick={() => setShowTagModal(true)}
        />
      </div>

      <TagModal
        kanbanId={form.getFieldValue("kanbanId")}
        showTagModal={showTagModal}
        setShowTagModal={setShowTagModal}
      />
    </section>
  );
};

export default Setting;
