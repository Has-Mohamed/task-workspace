import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import type { Task } from "@/shared/types/task";
import { useCreateTask, useUpdateTask } from "../../hooks/useTask";
import type { TaskFormValues } from "./schema";

export interface TaskModalProps {
  task?: Task; // undefined = create, present = edit
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const isEditing = Boolean(task);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const isSubmitting = createTask.isPending || updateTask.isPending;

  const handleSubmit = (values: TaskFormValues) => {
    const payload = {
      title: values.title,
      description: values.description || "",
      priority: values.priority,
      status: values.status,
      dueDate: values.dueDate,
    };

    if (task) {
      updateTask.mutate(
        { id: task.id, ...payload },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      createTask.mutate(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = task
    ? {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.split("T")[0],
      }
    : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel={isEditing ? "Update Task" : "Create Task"}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
