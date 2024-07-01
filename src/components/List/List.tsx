import React, { useMemo } from "react";

import AddCardButton from "@/components/AddCardButton";
import { Card } from "@/components/Card";
// component
import { ListTitle } from "@/components/List";
import { SortableContext } from "@dnd-kit/sortable";

interface IProps {
  list: Ilist;
  setIsDndDisabled?: ISetStateFunction<boolean>;
  tasks: Task[];
  setTasks: ISetStateFunction<Task[]>;
}

const List: React.FC<IProps> = (props) => {
  // console.log("props = ", props);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { list, tasks, setTasks, setIsDndDisabled = () => {} } = props;

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  // useEffect(() => {
  //   console.log("list render");
  // });
  // const addTask = () => {
  //   alert("wait");
  //   // const newTask: Task = {
  //   //   columnId: list.order,
  //   //   content: `${list.name}-card-${columnTasks.length + 1}`,
  //   // };
  //   // console.log("newTask = ", newTask);
  //   // setTasks([...tasks, newTask]);
  // };
  const columnTasks = useMemo(() => {
    return tasks.filter((task) => task.columnId === list.id);
  }, [tasks, list.id]);

  return (
    <div className="h-full w-[255px] flex flex-col rounded-md cursor-pointer p-3 bg-[#D9D9D9] max-h-fit">
      <ListTitle list={list} setIsDndDisabled={setIsDndDisabled} />
      <section className="flex-1 flex flex-col gap-2 scrollbar-none overflow-y-auto">
        <SortableContext items={tasksIds}>
          {columnTasks?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </SortableContext>
      </section>
      {/* <button onClick={addTask}>add card</button> */}
      <AddCardButton listId={list.id} setIsDndDisabled={setIsDndDisabled} />
    </div>
  );
};

export default List;
