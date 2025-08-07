import { useState } from "react";
import { Search, FlaskConical, BookOpen, Pill, Stethoscope, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function SearchInterface({ onSearch, isSearching }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");
  const [isQuickMode, setIsQuickMode] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isSearching) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full">
      {/* Medical Cross Icon and Title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-600 p-2 rounded-lg mr-3">
            <Plus className="h-8 w-8 text-white" />
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
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-6">
        <div className="relative bg-gray-600/50 rounded-lg p-4">
          <Input
            type="text"
            placeholder="Ask about labs, imaging, guidelines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-16 text-lg bg-transparent border-none focus:ring-0 text-gray-300 placeholder:text-gray-400"
            disabled={isSearching}
          />
          <div className="flex items-center gap-2 mt-3 text-gray-400">
            <span className="text-sm">⌘</span>
            <span className="text-sm">4</span>
            <span className="text-sm">↑</span>
            <div className="flex-1" />
            <Button
              type="submit"
              size="icon"
              disabled={!query.trim() || isSearching}
              className="h-8 w-8 bg-blue-600 hover:bg-blue-700 rounded"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>

      {/* Quick/Pro Toggle */}
      <div className="flex items-center gap-3 mb-8">
        <span className={`text-sm ${isQuickMode ? 'text-white' : 'text-gray-400'}`}>Quick</span>
        <Switch
          checked={!isQuickMode}
          onCheckedChange={(checked) => setIsQuickMode(!checked)}
          className="data-[state=checked]:bg-blue-600"
        />
        <span className={`text-sm ${!isQuickMode ? 'text-white' : 'text-gray-400'}`}>Pro</span>
      </div>

      {/* Medical Action Buttons */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="flex flex-col items-center gap-2 p-4 h-auto bg-gray-700/50 hover:bg-gray-600/50 rounded-lg">
          <FlaskConical className="h-6 w-6 text-blue-400" />
          <span className="text-sm text-gray-300">Lab Results</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-2 p-4 h-auto bg-gray-700/50 hover:bg-gray-600/50 rounded-lg">
          <BookOpen className="h-6 w-6 text-blue-400" />
          <span className="text-sm text-gray-300">Guidelines</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-2 p-4 h-auto bg-gray-700/50 hover:bg-gray-600/50 rounded-lg">
          <Pill className="h-6 w-6 text-blue-400" />
          <span className="text-sm text-gray-300">Drug Info</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-2 p-4 h-auto bg-gray-700/50 hover:bg-gray-600/50 rounded-lg">
          <Stethoscope className="h-6 w-6 text-blue-400" />
          <span className="text-sm text-gray-300">Diagnostics</span>
        </Button>
      </div>

      {isSearching && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Searching for answers...</p>
        </div>
      )}
    </div>
  );
}