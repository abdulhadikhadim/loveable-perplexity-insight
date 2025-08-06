import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  type: 'query' | 'response';
  content: string;
  sources?: Array<{ name: string; url: string }>;
  steps?: string[];
}

interface ChatAreaProps {
  conversation: Message[];
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function ChatArea({ conversation, onSearch, isSearching }: ChatAreaProps) {
  const [followUpQuery, setFollowUpQuery] = useState("");

  const handleFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpQuery.trim() && !isSearching) {
      onSearch(followUpQuery);
      setFollowUpQuery("");
    }
  };

  const latestResponse = conversation.filter(msg => msg.type === 'response').pop();

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4">
      {/* Chat Messages */}
      <div className="flex-1 py-8 space-y-6">
        {conversation.map((message, index) => (
          <div key={index} className="space-y-4">
            {message.type === 'query' ? (
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="font-medium text-foreground">{message.content}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Response Tabs */}
                <Tabs defaultValue="answer" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-muted">
                    <TabsTrigger value="answer">Answer</TabsTrigger>
                    <TabsTrigger value="sources">Sources</TabsTrigger>
                    <TabsTrigger value="steps">Steps</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="answer" className="mt-4">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <p className="text-foreground leading-relaxed">{message.content}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sources" className="mt-4">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="font-medium text-foreground mb-4">Sources</h3>
                      <div className="space-y-3">
                        {message.sources?.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-foreground hover:text-primary">{source.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="steps" className="mt-4">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="font-medium text-foreground mb-4">Steps</h3>
                      <ol className="space-y-3">
                        {message.steps?.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                              {idx + 1}
                            </span>
                            <span className="text-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        ))}
        
        {isSearching && (
          <div className="flex items-center gap-3 p-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Searching...</span>
          </div>
        )}
      </div>

      {/* Follow-up Input */}
      <div className="border-t border-border pt-4 pb-6">
        <form onSubmit={handleFollowUp} className="relative">
          <Input
            type="text"
            placeholder="Ask follow-up..."
            value={followUpQuery}
            onChange={(e) => setFollowUpQuery(e.target.value)}
            className="w-full h-12 pr-12 bg-card border-border"
            disabled={isSearching}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!followUpQuery.trim() || isSearching}
            className="absolute right-2 top-2 h-8 w-8 bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}