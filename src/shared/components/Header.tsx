import { CheckSquare } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
          <CheckSquare className="h-5 w-5" />
        </div>
        <h1 className="text-xl! font-bold tracking-tight text-foreground">
          Task &amp; Workflow Workspace
        </h1>
      </div>
    </header>
  );
}
