import React, { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/Card";
// component
import { ListTitle } from "@/components/List";

interface IProps {
  list: Ilist;
  tasks: Task[];
  setTasks: ISetStateFunction<Task[]>;
}

// const generateId = () => Math.floor(Math.random() * 10001);

const List: React.FC<IProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { list, tasks, setTasks } = props;
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
    // disabled:
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // transform: CSS.Translate.toString(transform),
  };
  const addTask = () => {
    alert("wait");
    // const newTask: Task = {
    //   columnId: list.order,
    //   content: `${list.name}-card-${columnTasks.length + 1}`,
    // };
    // console.log("newTask = ", newTask);
    // setTasks([...tasks, newTask]);
  };
  const columnTasks =
    tasks?.filter((task) => task.columnId === list.order) || [];
  if (isDragging) {
    return (
      <section
        ref={setNodeRef}
        style={style}
        className={`w-[255px] shrink-0 flex flex-col max-h-full shadow-md p-3 bg-[#D9D9D9] rounded-md opacity-50`}
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[255px] shrink-0 flex flex-col max-h-fit shadow-md p-3 bg-[#D9D9D9] rounded-md"
    >
      {list.name}
      <ListTitle />
      <section className="flex-1 flex flex-col gap-2 scrollbar-none overflow-y-auto">
        <SortableContext items={tasksIds}>
          {columnTasks?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </SortableContext>
      </section>
      <button onClick={addTask}>add card</button>
    </div>
  );
};

export default List;
