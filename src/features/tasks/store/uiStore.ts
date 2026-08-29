import { create } from "zustand";

export interface TaskUIState {
  viewMode: "board" | "list";
  activeTaskId: string | null;
  isCreateModalOpen: boolean;
  deleteTaskId: string | null;
  setViewMode: (v: "board" | "list") => void;
  openEdit: (id: string) => void;
  openCreate: () => void;
  closeModal: () => void;
  openDelete: (id: string) => void;
  closeDelete: () => void;
}

export const useTaskUIStore = create<TaskUIState>((set) => ({
  viewMode: "board",
  activeTaskId: null,
  isCreateModalOpen: false,
  deleteTaskId: null,
  setViewMode: (v) => set({ viewMode: v }),
  openEdit: (id) => set({ activeTaskId: id }),
  openCreate: () => set({ isCreateModalOpen: true }),
  closeModal: () => set({ activeTaskId: null, isCreateModalOpen: false }),
  openDelete: (id) => set({ deleteTaskId: id }),
  closeDelete: () => set({ deleteTaskId: null }),
}));
