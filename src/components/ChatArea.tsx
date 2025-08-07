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
              <div className="bg-blue-600 text-white rounded-lg p-3 inline-block max-w-fit">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-700 rounded px-2 py-1 text-xs">Q</span>
                  <p className="font-medium">{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Response Tabs */}
                <Tabs defaultValue="answer" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-600">
                    <TabsTrigger value="answer" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Answer</TabsTrigger>
                    <TabsTrigger value="steps" className="text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white">Steps</TabsTrigger>
                    <TabsTrigger value="sources" className="text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white">Source Tools</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="answer" className="mt-4">
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 text-white">
                      <div className="mb-4">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Clinical Guidelines</span>
                        <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs ml-2">assessment</span>
                        <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs ml-2">nexus-dx</span>
                      </div>
                      <div className="space-y-4">
                        <p className="leading-relaxed">{message.content}</p>
                        
                        {/* Medical Response Example */}
                        <div className="space-y-4">
                          <p className="font-semibold">**1. Type 1 Diabetes Mellitus**</p>
                          <p className="text-blue-400">ICD-10 Code: E10.9</p>
                          <p className="text-gray-300">
                            <strong>Rationale:</strong> Characterized by autoimmune destruction of pancreatic β-cells, leading to absolute insulin deficiency. 
                            Presents with rapid weight loss, polyuria, polydipsia, and blurred vision due to hyperglycemia.
                          </p>
                          
                          <p className="font-semibold">**2. Type 2 Diabetes Mellitus**</p>
                          <p className="text-blue-400">ICD-10 Code: E11.9</p>
                          <p className="text-gray-300">
                            <strong>Rationale:</strong> Involves insulin resistance and relative insulin deficiency. Though more gradual in onset, it can present with 
                            polyuria, polydipsia, and blurred vision, especially if previously undiagnosed. Often detected in adults during symptom flare-ups.
                          </p>
                          
                          <p className="font-semibold">**3. Central Diabetes Insipidus**</p>
                          <p className="text-blue-400">ICD-10 Code: E23.2</p>
                          <p className="text-gray-300">
                            <strong>Rationale:</strong> Caused by a deficiency of antidiuretic hormone (ADH), resulting in hypotonic polyuria and compensatory 
                            polydipsia. Weight loss and blurred vision may occur secondarily due to dehydration.
                          </p>
                          
                          <p className="text-gray-300 mt-4">
                            If you need guideline-based management, medication options, or lab test interpretation for any of these conditions, feel 
                            free to ask!
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sources" className="mt-4">
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                      <h3 className="font-medium text-white mb-4">Source Tools</h3>
                      <div className="space-y-3">
                        {message.sources?.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            </div>
                            <span className="text-gray-300 hover:text-blue-400">{source.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="steps" className="mt-4">
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                      <h3 className="font-medium text-white mb-4">Steps</h3>
                      <ol className="space-y-3">
                        {message.steps?.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              {idx + 1}
                            </span>
                            <span className="text-gray-300">{step}</span>
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
      <div className="border-t border-gray-700 pt-4 pb-6">
        <form onSubmit={handleFollowUp} className="relative">
          <Input
            type="text"
            placeholder="Ask a follow-up..."
            value={followUpQuery}
            onChange={(e) => setFollowUpQuery(e.target.value)}
            className="w-full h-12 pr-12 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
            disabled={isSearching}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!followUpQuery.trim() || isSearching}
            className="absolute right-2 top-2 h-8 w-8 bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}