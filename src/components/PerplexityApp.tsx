import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SearchInterface } from "@/components/SearchInterface";
import { ChatArea } from "@/components/ChatArea";

export function PerplexityApp() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    type: 'query' | 'response';
    content: string;
    sources?: Array<{ name: string; url: string }>;
    steps?: string[];
  }>>([]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setQuery(searchQuery);
    
    // Add query to conversation
    setConversation(prev => [...prev, {
      type: 'query',
      content: searchQuery
    }]);

    try {
      // Simulate API call with mock response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = {
        type: 'response' as const,
        content: `Based on your question "${searchQuery}", here's a comprehensive answer. This is a simulated response from the Perplexity AI clone. The system processes your query and provides detailed information with relevant sources and step-by-step explanations when applicable.`,
        sources: [
          { name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org" },
          { name: "Encyclopedia Britannica", url: "https://britannica.com" },
          { name: "Wikipedia", url: "https://wikipedia.org" }
        ],
        steps: [
          "Understanding the context of your question",
          "Searching through multiple reliable sources",
          "Analyzing and synthesizing the information",
          "Providing a comprehensive response with citations"
        ]
      };
      
      setConversation(prev => [...prev, mockResponse]);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 flex flex-col">
            {conversation.length === 0 ? (
              <SearchInterface 
                onSearch={handleSearch}
                isSearching={isSearching}
              />
            ) : (
              <ChatArea 
                conversation={conversation}
                onSearch={handleSearch}
                isSearching={isSearching}
              />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}