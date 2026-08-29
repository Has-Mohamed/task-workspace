import { Search, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-48">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-8"
        aria-label="Search tasks"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="absolute right-2 top-2 h-5 w-5 text-muted-foreground hover:text-foreground"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
