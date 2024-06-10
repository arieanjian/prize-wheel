import React, { Suspense } from "react";
interface IProps {
  kanbanId: string;
  tag: Itag | undefined;
  closeTagModal: () => void;
}
// import * as AntdIcons from '@ant-design/icons';

const TagModal: React.FC<IProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tag, closeTagModal } = props;
  const IconComponent = React.lazy(() =>
    import("@ant-design/icons").then((module) => ({
      default: module["StepForwardOutlined"],
      // default: module.StepForwardOutlined,
    }))
  );
  return (
    <section className="flex flex-col">
      TagModal
      <Suspense fallback={<div>Loading...</div>}>
        <IconComponent />
      </Suspense>
      {/* <StepForwardOutlined /> */}
    </section>
  );
};

export default TagModal;
