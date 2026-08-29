import type { Task, TaskStatus, TaskPriority } from "@/shared/types/task";

export interface TasksFilterOptions {
  q?: string;
  status?: TaskStatus | "all";
  priority?: TaskPriority | "all";
  from?: string;
  to?: string;
}

export function filterTasks(
  tasks: Task[],
  filters: TasksFilterOptions,
): Task[] {
  if (!tasks) return [];

  const search = filters.q?.trim().toLowerCase();
  const statusFilter =
    filters.status && filters.status !== "all" ? filters.status : null;
  const priorityFilter =
    filters.priority && filters.priority !== "all" ? filters.priority : null;
  const fromTime = filters.from ? new Date(filters.from).getTime() : null;
  const toTime = filters.to ? new Date(filters.to).getTime() : null;

  return tasks.filter((task) => {
    if (search) {
      const matchTitle = task.title.toLowerCase().includes(search);
      const matchDesc = task.description.toLowerCase().includes(search);
      if (!matchTitle && !matchDesc) return false;
    }

    if (statusFilter && task.status !== statusFilter) {
      return false;
    }

    if (priorityFilter && task.priority !== priorityFilter) {
      return false;
    }

    if (fromTime !== null && !isNaN(fromTime)) {
      const taskTime = new Date(task.dueDate).getTime();
      if (isNaN(taskTime) || taskTime < fromTime) return false;
    }

    if (toTime !== null && !isNaN(toTime)) {
      const taskTime = new Date(task.dueDate).getTime();
      if (isNaN(taskTime) || taskTime > toTime) return false;
    }

    return true;
  });
}
