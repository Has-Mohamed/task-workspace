import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { RotateCcw } from "lucide-react";
import type { TaskStatus, TaskPriority } from "@/shared/types/task";

interface FilterBarProps {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  from: string;
  to: string;
  onStatusChange: (status: TaskStatus | "all") => void;
  onPriorityChange: (priority: TaskPriority | "all") => void;
  onFromChange: (from: string) => void;
  onToChange: (to: string) => void;
  onReset: () => void;
}

export function FilterBar({
  status,
  priority,
  from,
  to,
  onStatusChange,
  onPriorityChange,
  onFromChange,
  onToChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters =
    status !== "all" || priority !== "all" || Boolean(from) || Boolean(to);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <div className="w-36">
        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as TaskStatus | "all")}
          aria-label="Filter by status"
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Priority Filter */}
      <div className="w-36">
        <Select
          value={priority}
          onValueChange={(value) =>
            onPriorityChange(value as TaskPriority | "all")
          }
          aria-label="Filter by priority"
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Due Date From */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>From:</span>
        <Input
          type="date"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
          className="w-36 h-9 text-xs"
          aria-label="Filter by start date"
        />
      </div>

      {/* Due Date To */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>To:</span>
        <Input
          type="date"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
          className="w-36 h-9 text-xs"
          aria-label="Filter by end date"
        />
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-9 gap-1 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      )}
    </div>
  );
}
