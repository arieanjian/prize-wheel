import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect, useMemo, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { Card } from "@/components/Card";
// component
import List from "./List";
import CreateList from "./CreateList";
import { useWebSocket, IQueryParams } from "@/hooks/webSocket";

interface IParams extends IQueryParams { kanbanId: string };

interface Iprops {
  kanbanId: string;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListGroup: React.FC<Iprops> = ({kanbanId}) => {
  const [lists, setLists] = useState<Ilist[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeList, setActiveList] = useState<Ilist | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 3,
    },
  });

  const [socketProps, setSocketProps] = useState<IParams>({ kanbanId: kanbanId });

  const call_kanbanSocket = useWebSocket({
    url: `ws://localhost:8080/kanban`,
    queryParams: socketProps,
  });

  // 第一次進入頁面時，建立 WebSocket 連線
  useEffect(() => {
    call_kanbanSocket.createSocket();
    // return () => {
    //   call_kanbanSocket.closeSocket();
    // };
  }, []);

  useEffect(() => {
    console.log("call_kanbanSocket.lastMessage = ", call_kanbanSocket.lastMessage);
  }, [call_kanbanSocket.lastMessage]);

  const sensors = useSensors(pointerSensor);

  const listIds = useMemo(() => {
    return lists.map((list) => list.order);
  }, [lists]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list);
      return;
    }
    if (event.active.data.current?.type === "Card") {
      setActiveTask(event.active.data.current.card);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log("DragEndEvent = ", event);
    setActiveList(null);
    setActiveTask(null);

    const {
      active, // 記錄拖曳開始時的資訊
      over, // 記錄拖曳結束時的資訊
    } = event;
    console.log("active = ", active);
    console.log("over = ", over);
    if (!over) return;

    // 結束拖曳時放置位置為原點
    if (active.id === over.id) return;

    // 拖曳開始時 dom 的 type
    const activeType = active.data.current?.type || "";
    // 拖曳結束時 dom 的 type
    const overType = over.data.current?.type || "";

    if (active.id === over.id) return;
    // 拖曳 List
    if (activeType === "List" && overType === "List") {
      const activeIndex = lists.findIndex((list) => list.order === active.id);
      const overIndex = lists.findIndex((list) => list.order === over.id);
      setLists(arrayMove(lists, activeIndex, overIndex));
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    // 卡片移動到不同的看板
    const isActiveCard = active.data.current?.type === "Card";
    const isOvereCard = over.data.current?.type === "Card";

    if (!isActiveCard) return;

    // Im dropping a Task over another Task
    if (isActiveCard && isOvereCard) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAList = over.data.current?.type === "List";
    console.log('over.data.current?.type = ',over.data.current?.type)
    // Im dropping a Task over a column
    if (isActiveCard && isOverAList) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        console.log("aaa activeIndex = ", activeIndex);
        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <section className="flex-1 flex gap-4 mb-2 min-w-full overflow-auto">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <SortableContext items={listIds}>
          {lists.map((list) => (
            <List
              key={list.order}
              list={list}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          <div className="rotate-[5deg] flex h-full">
            {activeList && (
              <List list={activeList} tasks={tasks} setTasks={setTasks} />
            )}
            {activeTask && <Card task={activeTask} />}
          </div>
        </DragOverlay>
      </DndContext>

      <CreateList kanbanId={kanbanId} />
    </section>
  );
};



export default ListGroup;
