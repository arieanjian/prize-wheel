import React, { useEffect, useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import AddCardButton from "@/components/AddCardButton";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/Card";
// component
import { ListTitle } from "@/components/List";

interface IProps {
  list: Ilist;
  tasks: Task[];
  setTasks: ISetStateFunction<Task[]>;
}
const Dnd: React.FC<IProps> = (props) => {};

const List: React.FC<IProps> = React.memo((props) => {
  // console.log("props = ", props);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { list, tasks, setTasks } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: {
      type: "List",
      list: list,
    },
    disabled: isDisabled,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // transform: CSS.Translate.toString(transform),
  };
  useEffect(() => {
    console.log("list render");
  });
  useEffect(() => {
    console.log("list render => list");
  }, [list]);
  useEffect(() => {
    console.log("list render => tasks");
  }, [tasks]);
  useEffect(() => {
    console.log("list render => setTasks");
  }, [setTasks]);
  // const addTask = () => {
  //   alert("wait");
  //   // const newTask: Task = {
  //   //   columnId: list.order,
  //   //   content: `${list.name}-card-${columnTasks.length + 1}`,
  //   // };
  //   // console.log("newTask = ", newTask);
  //   // setTasks([...tasks, newTask]);
  // };

  const columnTasks =
    tasks?.filter((task) => task.columnId === list.order) || [];

  if (isDragging) {
    return (
      <section
        data-testid="list-element"
        ref={setNodeRef}
        style={style}
        className={`w-[255px] shrink-0 flex flex-col max-h-full shadow-md p-3 bg-[#D9D9D9] rounded-md opacity-50`}
      />
    );
  }
  return (
    <div
      data-testid="list-element"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[255px] shrink-0 flex flex-col max-h-fit shadow-md p-3 bg-[#D9D9D9] rounded-md cursor-pointer"
    >
      <ListTitle list={list} setIsDisabled={setIsDisabled} />
      <section className="flex-1 flex flex-col gap-2 scrollbar-none overflow-y-auto">
        <SortableContext items={tasksIds}>
          {columnTasks?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </SortableContext>
      </section>
      {/* <button onClick={addTask}>add card</button> */}
      <AddCardButton listId={list.id} />
    </div>
  );
});

export default List;
