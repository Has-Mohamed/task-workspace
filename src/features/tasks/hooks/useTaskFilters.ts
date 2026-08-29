import { useSearchParams } from "react-router-dom";
import type { TaskPriority, TaskStatus } from "@/shared/types/task";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";

export function useTasksFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = (searchParams.get("status") as TaskStatus) || "all";
  const priority = (searchParams.get("priority") as TaskPriority) || "all";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const [searchQuery, setSearchQuery] = useState(search);
  const debouncedSearch = useDebounce(searchQuery);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const setSearch = (search: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (search) {
        next.set("search", search);
      } else {
        next.delete("search");
      }
      return next;
    });
  };

  const setStatus = (status: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (status) {
        next.set("status", status);
      } else {
        next.delete("status");
      }
      return next;
    });
  };

  const setPriority = (priority: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (priority) {
        next.set("priority", priority);
      } else {
        next.delete("priority");
      }
      return next;
    });
  };

  const setFrom = (from: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (from) {
        next.set("from", from);
      } else {
        next.delete("from");
      }
      return next;
    });
  };

  const setTo = (to: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (to) {
        next.set("to", to);
      } else {
        next.delete("to");
      }
      return next;
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSearchParams(new URLSearchParams());
  };

  return {
    search,
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
  };
}
