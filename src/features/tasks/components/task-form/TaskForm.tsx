import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { taskSchema, type TaskFormValues } from "./schema";
import type { TaskPriority, TaskStatus } from "@/shared/types/task";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";

export interface TaskFormProps {
  defaultValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
}

export function TaskForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Task",
  onCancel,
}: TaskFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium" as TaskPriority,
      status: "todo" as TaskStatus,
      dueDate: new Date().toISOString().split("T")[0],
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data: TaskFormValues) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
      noValidate
    >
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="task-title">Title *</Label>
        <Input
          id="task-title"
          placeholder="Task title"
          {...register("title")}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "task-title-error" : undefined}
        />
        {errors.title && (
          <p id="task-title-error" className="text-xs text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="task-description">Description</Label>
        <Textarea
          id="task-description"
          placeholder="Add details about this task..."
          rows={3}
          {...register("description")}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "task-description-error" : undefined
          }
        />
        {errors.description && (
          <p id="task-description-error" className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Priority */}
        <div className="space-y-1.5">
          <Label htmlFor="task-priority">Priority *</Label>

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                id="task-priority"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <Label htmlFor="task-status">Status *</Label>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                id="task-status"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.status && (
            <p className="text-xs text-destructive">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Due Date */}
      <div className="space-y-1.5">
        <Label htmlFor="task-dueDate">Due Date *</Label>
        <Input
          id="task-dueDate"
          type="date"
          {...register("dueDate")}
          aria-invalid={Boolean(errors.dueDate)}
          aria-describedby={errors.dueDate ? "task-dueDate-error" : undefined}
        />
        {errors.dueDate && (
          <p id="task-dueDate-error" className="text-xs text-destructive">
            {errors.dueDate.message}
          </p>
        )}
      </div>

      {/* Form actions */}
      <div className="flex justify-end gap-2 pt-4 border-t border-border">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
