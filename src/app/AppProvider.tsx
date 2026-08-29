import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-center" />
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
}
