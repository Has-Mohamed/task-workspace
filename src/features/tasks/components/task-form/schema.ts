import { z } from "zod";

const priorityValues = ["low", "medium", "high", "urgent"] as const;
const statusValues = ["todo", "in-progress", "in-review", "done"] as const;

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters long")
    .max(500, "Description must not exceed 500 characters"),

  priority: z.enum(priorityValues, {
    required_error: "Priority is required",
    invalid_type_error: "Invalid priority level",
  }),
  status: z.enum(statusValues, {
    required_error: "Status is required",
    invalid_type_error: "Invalid status level",
  }),
  dueDate: z.string().refine((dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }, "Invalid date"),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
