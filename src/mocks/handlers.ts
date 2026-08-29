import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import type { Task, TaskStatus, TaskPriority } from "@/shared/types/task";

const STATUSES: TaskStatus[] = ["todo", "in-progress", "in-review", "done"];
const PRIORITIES: TaskPriority[] = ["low", "medium", "high", "urgent"];

function generateTask(): Task {
  const created = faker.date.recent({ days: 30 }).toISOString();
  return {
    id: faker.string.uuid(),
    title: faker.hacker.phrase(),
    description: faker.lorem.sentences(2),
    priority: faker.helpers.arrayElement(PRIORITIES),
    status: faker.helpers.arrayElement(STATUSES),
    dueDate: faker.date.soon({ days: 30 }).toISOString(),
    createdAt: created,
    updatedAt: created,
  };
}

export let tasksDb: Task[] = Array.from({ length: 500 }, generateTask);

export const handlers = [
  http.get("/api/tasks", () => HttpResponse.json(tasksDb)),

  http.post("/api/tasks", async ({ request }) => {
    const body = (await request.json()) as Omit<
      Task,
      "id" | "createdAt" | "updatedAt"
    >;
    const now = new Date().toISOString();
    const task: Task = {
      ...body,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    tasksDb = [task, ...tasksDb];
    return HttpResponse.json(task, { status: 201 });
  }),

  http.patch("/api/tasks/:id", async ({ params, request }) => {
    const updates = (await request.json()) as Partial<Task>;

    if (Math.random() < 0.1) {
      return HttpResponse.json({ message: "Server error" }, { status: 500 });
    }

    tasksDb = tasksDb.map((t) =>
      t.id === params.id
        ? { ...t, ...updates, updatedAt: new Date().toISOString() }
        : t,
    );
    return HttpResponse.json(tasksDb.find((t) => t.id === params.id));
  }),

  http.delete("/api/tasks/:id", ({ params }) => {
    tasksDb = tasksDb.filter((t) => t.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
