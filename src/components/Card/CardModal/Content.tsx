import { Form, FormInstance, Input, Typography } from "antd";

// component
import Members from "./Members";
import React from "react";

export interface IProps {
  card: Icard | undefined;
  form: FormInstance<Icard>;
}

const { Title, Text } = Typography;

const Content: React.FC<IProps> = ({ card, form }) => {
  return (
    <section className="flex flex-col">
      <Title level={3} className="text-[rgb(125,125,125)] mb-2">
        Content
      </Title>

      <Form.Item
        label={<Text strong>Title</Text>}
        name="title"
        rules={[{ required: true, message: "Please input card title!" }]}
      >
        <Input placeholder="place input title" />
      </Form.Item>

      <Form.Item label={<Text strong>Description</Text>} name="description">
        <Input.TextArea rows={3} placeholder="place input description" />
      </Form.Item>

      <Members card={card} form={form} />
    </section>
  );
};

export default Content;
