import { useState } from "react";
import { Search, Mic, Paperclip, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Loveable AI
        </h1>
        <p className="text-xl text-muted-foreground">
          Ask anything, get intelligent answers
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Ask anything or @mention a Space..."
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

      {/* Action Buttons */}
      <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Mic className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Settings className="h-5 w-5" />
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