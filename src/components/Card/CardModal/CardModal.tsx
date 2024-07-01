import { Button, Divider, Form } from "antd";

// component
import Content from "./Content";
import React from "react";
import Setting from "./Setting";

interface IProps {
  card: Icard | undefined;
  closeCardModal: () => void;
  setIsShowModal: ISetStateFunction<boolean>;
}

const CardModal: React.FC<IProps> = ({
  card,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsShowModal,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  closeCardModal,
}) => {
  const [form] = Form.useForm();

  console.log("card render");

  const onSubmit = (values: Icard) => {
    console.log("values = ", values);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        isvalid: true,
        ...card,
      }}
    >
      <Divider className="py-1" />
      <Content card={card} form={form} />
      <Divider className="py-1" />
      <Setting card={card} form={form} />
      <Divider className="py-1" />
      <div className="flex justify-end gap-2">
        <Button>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default CardModal;
