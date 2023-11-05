import React from "react";
// component
import Star from "../Star";

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface Iprops {
  kanban: Ikanban;
}

const MenuItem: React.FC<Iprops> = ({ kanban }) => {
  const handelClick = (event: ClickEvent) => {
    event.stopPropagation();
  };
  if (!kanban) return;
  return (
    <div className="flex justify-between pr-1">
      <span>{kanban.name}</span>
      <Star
        isFill={kanban.isPinned}
        onClick={(e: ClickEvent) => handelClick(e)}
      />
    </div>
  );
};

export default MenuItem;
