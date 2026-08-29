import type { Task, TaskStatus } from "@/shared/types/task";
import { taskService } from "../services/taskService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const taskKeys = {
  all: ["tasks"],
  id: (id: string) => ["tasks", id],
};

export function useTasks() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: () => taskService.getAll(),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: taskService.update,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: taskService.delete,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: taskKeys.all });
      const previousTasks = qc.getQueryData<Task[]>(taskKeys.all) || [];

      qc.setQueryData(
        taskKeys.all,
        previousTasks.filter((old) => old.id !== id),
      );
      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        qc.setQueryData(taskKeys.all, context.previousTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useUpdateTaskStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: taskService.updateStatus,
    onMutate: ({ id, status }: { id: string; status: TaskStatus }) => {
      qc.cancelQueries({ queryKey: taskKeys.all });
      const previousTasks = qc.getQueryData<Task[]>(taskKeys.all) || [];

      qc.setQueryData(
        taskKeys.all,
        previousTasks.map((old) => (old.id === id ? { ...old, status } : old)),
      );
      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        qc.setQueryData(taskKeys.all, context.previousTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}
