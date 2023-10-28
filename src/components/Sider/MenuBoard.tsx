import React from "react";
// component
import Star from "../Star";

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface Iprops {
  board: Iboard;
}

const MenuBoard: React.FC<Iprops> = (props) => {
  const { board } = props;

  const handelClick = (event: ClickEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="flex justify-between pr-1">
      <span>{board.boardName}</span>
      <Star
        isFill={board.isPinned}
        onClick={(e: ClickEvent) => handelClick(e)}
      />
    </div>
  );
};

export default MenuBoard;
