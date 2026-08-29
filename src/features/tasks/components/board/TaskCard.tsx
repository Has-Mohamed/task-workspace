import { Calendar, Edit, Trash2, GripVertical } from "lucide-react";
import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import type { Task } from "@/shared/types/task";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isOverlay?: boolean;
}

export const TaskCard = React.memo(function TaskCard({
  task,
  onEdit,
  onDelete,
  isOverlay = false,
}: TaskCardProps) {
  const draggable = useDraggable({
    id: task.id,
    data: { status: task.status, task },
    disabled: isOverlay,
  });

  const setNodeRef = isOverlay ? undefined : draggable.setNodeRef;
  const isDragging = isOverlay ? false : draggable.isDragging;
  const listeners = isOverlay ? undefined : draggable.listeners;
  const attributes = isOverlay ? undefined : draggable.attributes;

  const formattedDate = new Date(task.dueDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      ref={setNodeRef}
      role="button"
      tabIndex={0}
      aria-roledescription="draggable task card"
      aria-label={`Task: ${task.title}`}
      className={`group relative flex flex-col justify-between rounded-lg border border-border bg-card p-4 shadow-xs transition-shadow hover:shadow-md ${
        isDragging ? "opacity-30" : ""
      } ${isOverlay ? "shadow-lg border-primary/40 cursor-grabbing" : ""}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant={task.priority}>{task.priority}</Badge>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task.id);
              }}
              aria-label={`Edit task ${task.title}`}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              aria-label={`Delete task ${task.title}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <span
              {...listeners}
              {...attributes}
              className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground touch-none"
              aria-label="Drag handle"
            >
              <GripVertical className="h-4 w-4" />
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-sm leading-snug mb-1 text-foreground">
          {task.title}
        </h3>

        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </span>
      </div>
    </div>
  );
});
