import type { DragEndEvent } from "@dnd-kit/core";
import type { TaskStatus } from "@/shared/types/task";

export interface DragEndResult {
  taskId: string;
  newStatus: TaskStatus;
}

const VALID_STATUSES: TaskStatus[] = ["todo", "in-progress", "in-review", "done"];

export function handleDragEndLogic(event: DragEndEvent): DragEndResult | null {
  const { active, over } = event;
  if (!over) return null;

  const taskId = String(active.id);
  const overId = String(over.id) as TaskStatus;

  // Verify that overId is a valid TaskStatus column
  if (!VALID_STATUSES.includes(overId)) return null;

  // Check if task is moved to a different status column
  const currentStatus = active.data.current?.status as TaskStatus | undefined;
  if (currentStatus === overId) return null;

  return {
    taskId,
    newStatus: overId,
  };
}
