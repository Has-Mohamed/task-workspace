import { apiClient } from "@/shared/services/apiClient";
import type { Task, TaskStatus } from "@/shared/types/task";

export const taskService = {
  getAll: (): Promise<Task[]> => apiClient<Task[]>("/api/tasks"),
  create: (data: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> =>
    apiClient<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (
    id: string,
    data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Task> =>
    apiClient(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  updateStatus: (id: string, status: TaskStatus): Promise<Task> =>
    apiClient<Task>(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  delete: (id: string): Promise<void> =>
    apiClient<void>(`/api/tasks/${id}`, {
      method: "DELETE",
    }),
};
