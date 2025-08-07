import { useState } from "react";
import { Search, Plus, Upload, Activity, FileText, Pill, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function SearchInterface({ onSearch, isSearching }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isSearching) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full">
      {/* Main Title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Plus className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-foreground">
            ClarosMed
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Ask anything medical
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Ask about labs, imaging, guidelines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-4 pr-16 text-lg border-primary/30 focus:border-primary bg-card"
            disabled={isSearching}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!query.trim() || isSearching}
            className="absolute right-2 top-2 h-10 w-10 bg-primary hover:bg-primary/90"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Quick/Pro Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground">Quick</span>
        <Switch />
        <span className="text-sm text-muted-foreground">Pro</span>
      </div>

      {/* Medical Action Buttons */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <Button variant="secondary" className="flex items-center gap-2 px-4 py-2">
          <Activity className="h-4 w-4" />
          <span>Lab Results</span>
        </Button>
        <Button variant="secondary" className="flex items-center gap-2 px-4 py-2">
          <FileText className="h-4 w-4" />
          <span>Guidelines</span>
        </Button>
        <Button variant="secondary" className="flex items-center gap-2 px-4 py-2">
          <Pill className="h-4 w-4" />
          <span>Drug Info</span>
        </Button>
        <Button variant="secondary" className="flex items-center gap-2 px-4 py-2">
          <Stethoscope className="h-4 w-4" />
          <span>Diagnostics</span>
        </Button>
      </div>

      {isSearching && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Searching for answers...</p>
        </div>
      )}
    </div>
  );
}