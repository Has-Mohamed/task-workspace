import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col bg-background p-6 overflow-hidden">
      {children}
    </div>
  );
}

export default Layout;
