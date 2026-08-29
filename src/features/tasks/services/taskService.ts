import { apiClient } from "@/shared/services/apiClient";
import type { Task, TaskStatus } from "@/shared/types/task";

export const taskService = {
  getAll: (): Promise<Task[]> => apiClient<Task[]>("/api/tasks"),
  create: (data: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> =>
    apiClient<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: ({
    id,
    ...update
  }: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">> & {
    id: string;
  }): Promise<Task> =>
    apiClient(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
    }),
  updateStatus: ({
    id,
    status,
  }: {
    id: string;
    status: TaskStatus;
  }): Promise<Task> =>
    apiClient(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  delete: (id: string): Promise<void> =>
    apiClient<void>(`/api/tasks/${id}`, {
      method: "DELETE",
    }),
};
