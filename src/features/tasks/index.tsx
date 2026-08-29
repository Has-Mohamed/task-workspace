import { SearchBar } from "./components/filters/SearchBar";
import { FilterBar } from "./components/filters/FilterBar";
import { useTasksFilters } from "./hooks/useTaskFilters";
import { useTasks } from "./hooks/useTask";
import VirtualizedTaskList from "./components/list/VirtualizedTaskList";
import { useMemo } from "react";
import { filterTasks } from "./utils/filterTasks";
import { useTaskUIStore } from "./store/uiStore";
import { TaskModal } from "./components/task-form/TaskModal";
import { LayoutGrid, ListIcon, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DeleteTaskDialog } from "./components/task-form/DeleteTaskDialog";
import { KanbanBoard } from "./components/board/KanbanBoard";

function TasksFeature() {
  const {
    activeTaskId,
    isCreateModalOpen,
    deleteTaskId,
    openEdit,
    openCreate,
    closeModal,
    openDelete,
    closeDelete,
    viewMode,
    setViewMode,
  } = useTaskUIStore();

  const { data: tasks, isLoading, error, refetch } = useTasks();

  const activeTaskToEdit = useMemo(() => {
    if (!activeTaskId || !tasks) return undefined;
    return tasks.find((t) => t.id === activeTaskId);
  }, [activeTaskId, tasks]);

  const {
    searchQuery,
    setSearchQuery,
    status,
    priority,
    from,
    to,
    setStatus,
    setPriority,
    setFrom,
    setTo,
    resetFilters,
  } = useTasksFilters();

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks || [], {
      q: searchQuery,
      status,
      priority,
      from,
      to,
    });
  }, [tasks, searchQuery, status, priority, from, to]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            status={status}
            priority={priority}
            from={from}
            to={to}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            onFromChange={setFrom}
            onToChange={setTo}
            onReset={resetFilters}
          />
        </div>
        <div className="flex items-center border border-border rounded-md bg-muted/40 p-0.5">
          <Button
            type="button"
            variant={viewMode === "board" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("board")}
            className="h-8 gap-1.5 px-2.5 text-xs"
            aria-label="Switch to Board View"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Board
          </Button>
          <Button
            type="button"
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 gap-1.5 px-2.5 text-xs"
            aria-label="Switch to List View"
          >
            <ListIcon className="h-3.5 w-3.5" />
            List
          </Button>
        </div>

        {/* Create task button */}
        <Button onClick={openCreate} className="h-9 gap-1.5 text-sm">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg border border-destructive/20 bg-destructive/5">
            <p className="text-destructive font-medium mb-2">
              Failed to load tasks
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : viewMode === "board" ? (
          <KanbanBoard
            tasks={filteredTasks}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        ) : (
          <VirtualizedTaskList
            tasks={filteredTasks}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        )}
      </div>

      {(isCreateModalOpen || Boolean(activeTaskId)) && (
        <TaskModal
          isOpen={isCreateModalOpen || Boolean(activeTaskId)}
          task={activeTaskToEdit}
          onClose={closeModal}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {Boolean(deleteTaskId) && (
        <DeleteTaskDialog taskId={deleteTaskId} onClose={closeDelete} />
      )}
    </div>
  );
}

export default TasksFeature;
