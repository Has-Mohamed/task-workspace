import { SearchBar } from "../components/filters/SearchBar";
import { FilterBar } from "../components/filters/FilterBar";
import { useTasksFilters } from "./hooks/useTaskFilters";
import { useTasks } from "./hooks/useTask";

function TasksFeature() {
  const { data: tasks, isLoading, error } = useTasks();

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
      </div>

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          tasks?.map((task) => <div key={task.id}>{task.title}</div>)
        )}
      </div>
    </div>
  );
}

export default TasksFeature;
