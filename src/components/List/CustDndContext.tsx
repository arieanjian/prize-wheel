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
import React, { useState } from "react";

// component
import { Card } from "@/components/Card";
import List from "./List";
// util
import { arrayMoveWithOrder } from "@/util/kanban";
// util
import debounce from "@/util/debounce";
// import { debounce } from "lodash";
// api
import { useChangeListOrder } from "@/hooks/List";

interface Iprops {
  children: React.ReactNode;
  lists: Ilist[];
  setLists: ISetStateFunction<Ilist[]>;
  tasks: Task[];
  setTasks: ISetStateFunction<Task[]>;
}

const CustDndContext: React.FC<Iprops> = ({
  lists,
  setLists,
  tasks,
  setTasks,
  children,
}) => {
  const [activeList, setActiveList] = useState<Ilist | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // 變更 list 順序
  const changeListOrder_mudation = useChangeListOrder();
  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
      // delay: 100,
      // tolerance: 0,
    },
  });
  // const mouseSensor = useSensor(MouseSensor, {
  //   // Require the mouse to move by 10 pixels before activating
  //   activationConstraint: {
  //     delay: 250,
  //     distance: 300,
  //     tolerance: 5,
  //   },
  // });
  const sensors = useSensors(pointerSensor);

  const onDragStart = debounce((event: DragStartEvent) => {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list);
      return;
    }
    if (event.active.data.current?.type === "Card") {
      setActiveTask(event.active.data.current.card);
      return;
    }
  }, 0);
  const onDragEnd = debounce((event: DragEndEvent) => {
    setActiveList(null);
    setActiveTask(null);

    const {
      active, // 記錄拖曳開始時的資訊
      over, // 記錄拖曳結束時的資訊
    } = event;
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
      const activeList: Ilist | undefined = lists.find(
        (list) => list.id === active.id
      );
      const overList: Ilist | undefined = lists.find(
        (list) => list.id === over.id
      );
      if (activeList && overList) {
        // call API 變更 list 順序
        changeListOrder_mudation.mutate({
          activeListId: activeList.id,
          overListId: overList.id,
        });
        // 用樂觀更新 list 順序
        setLists(arrayMoveWithOrder(lists, activeList.order, overList.order));
      }
    }
  }, 0);
  const onDragOver = debounce((event: DragOverEvent) => {
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
          return arrayMoveWithOrder(tasks, activeIndex, overIndex - 1);
        }

        return arrayMoveWithOrder(tasks, activeIndex, overIndex);
      });
    }

    const isOverAList = over.data.current?.type === "List";
    // Im dropping a Task over a column
    if (isActiveCard && isOverAList) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return arrayMoveWithOrder(tasks, activeIndex, activeIndex);
      });
    }
  }, 0);
  console.log("CustDndContext");
  return (
    <DndContext
      data-testid="dnd-context"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      sensors={sensors}
      // modifiers={[restrictToWindowEdges]}
      // collisionDetection={pointerWithin}
    >
      {children}
      <DragOverlay>
        <div className="rotate-[5deg] flex h-full">
          {activeList && (
            <List list={activeList} tasks={tasks} setTasks={setTasks} />
          )}
          {activeTask && <Card task={activeTask} />}
        </div>
      </DragOverlay>
    </DndContext>
  );
};
// CustDndContext.desplayName = "CustDndContext";
// CustDndContext.prototype = {};

export default CustDndContext;
