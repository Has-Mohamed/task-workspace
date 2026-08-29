import { taskService } from "../services/taskService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const taskKeys = {
  all: ["tasks"],
  id: (id: string) => ["tasks", id],
};

export function useTasks() {
  return useQuery({
    queryKey: [taskKeys.all],
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
