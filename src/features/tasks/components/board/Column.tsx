import { useDroppable } from "@dnd-kit/core";
import { memo } from "react";
import { Badge } from "@/shared/components/ui/badge";
import type { Task, TaskStatus } from "@/shared/types/task";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Column = memo(function Column({
  title,
  status,
  tasks,
  onEdit,
  onDelete,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col flex-1 min-w-[280px] h-full rounded-lg border border-border bg-muted/30 p-4 transition-colors ${
        isOver ? "bg-accent/30 border-primary/50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm text-foreground">{title}</h2>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs">
            {tasks.length}
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex-1 flex items-center justify-center rounded-md border border-dashed border-border/60 p-4 text-xs text-muted-foreground">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
});

