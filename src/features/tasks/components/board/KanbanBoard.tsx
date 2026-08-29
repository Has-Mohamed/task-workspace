import { flushSync } from "react-dom";

import type { Task, TaskStatus } from "@/shared/types/task";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";

import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { useUpdateTaskStatus } from "../../hooks/useTask";
import { handleDragEndLogic } from "../../utils/dragHelpers";

interface KanbanBoardProps {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const COLUMNS: Array<{ title: string; status: TaskStatus }> = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "In Review", status: "in-review" },
  { title: "Done", status: "done" },
];

export function KanbanBoard({ tasks, onEdit, onDelete }: KanbanBoardProps) {
  const { mutate: updateStatus } = useUpdateTaskStatus();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const pointerSensorOptions = useMemo(
    () => ({
      activationConstraint: {
        distance: 3,
      },
    }),
    [],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, pointerSensorOptions),
    useSensor(KeyboardSensor),
  );

  const measuringConfig = useMemo(
    () => ({
      droppable: {
        strategy: MeasuringStrategy.BeforeDragging,
      },
    }),
    [],
  );

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      todo: [],
      "in-progress": [],
      "in-review": [],
      done: [],
    };
    tasks.forEach((t) => {
      if (map[t.status]) {
        map[t.status].push(t);
      }
    });
    return map;
  }, [tasks]);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const task = tasks.find((t) => t.id === String(event.active.id));
      if (task) setActiveTask(task);
    },
    [tasks],
  );
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const result = handleDragEndLogic(event);

      if (result) {
        // apply the cache update FIRST, synchronously, before dropping the overlay
        flushSync(() => {
          updateStatus({ id: result.taskId, status: result.newStatus });
        });
      }

      setActiveTask(null); // now the underlying card is already in its new column
    },
    [updateStatus],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      measuring={measuringConfig}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-1 gap-4 overflow-x-auto pb-2 h-full min-h-0">
        {COLUMNS.map((col) => (
          <Column
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={tasksByStatus[col.status] || []}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div style={{ willChange: "transform" }}>
            <TaskCard
              task={activeTask}
              onEdit={onEdit}
              onDelete={onDelete}
              isOverlay
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
