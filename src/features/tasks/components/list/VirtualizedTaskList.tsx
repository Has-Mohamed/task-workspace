import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import type { Task } from "@/shared/types/task";
import { Calendar, Edit, Trash2 } from "lucide-react";

interface VirtualizedTaskListProps {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function VirtualizedTaskList({
  tasks,
  onEdit,
  onDelete,
}: VirtualizedTaskListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 8,
  });

  if (tasks.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
        No tasks match your filters.
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-150 w-full overflow-auto rounded-lg border border-border bg-card"
      role="list"
      aria-label="Task list"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const task = tasks[virtualRow.index];
          if (!task) return null;

          const formattedDate = new Date(task.dueDate).toLocaleDateString(
            undefined,
            { month: "short", day: "numeric" },
          );

          return (
            <div
              key={task.id}
              role="listitem"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="flex items-center justify-between border-b border-border px-4 py-2 hover:bg-muted/40 transition-colors gap-4"
            >
              <div className="flex flex-1 items-center gap-3 min-w-0">
                <div className="w-28 flex">
                  <Badge variant={task.status} className="shrink-0">
                    {task.status}
                  </Badge>
                </div>
                <div className="w-28 flex">
                  <Badge variant={task.priority} className="shrink-0">
                    {task.priority}
                  </Badge>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-foreground truncate">
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-xs text-muted-foreground truncate">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="items-center gap-1 text-xs text-muted-foreground hidden sm:flex">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onEdit(task.id)}
                    aria-label={`Edit task ${task.title}`}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(task.id)}
                    aria-label={`Delete task ${task.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualizedTaskList;
