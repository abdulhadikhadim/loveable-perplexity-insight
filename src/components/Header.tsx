import { Share2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The page URL has been copied to your clipboard.",
    });
  };

  return (
    <header className="h-14 border-b border-gray-700 bg-gray-900 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white" />
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1 rounded">
            <Plus className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">ClarosMed</h1>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="hover:bg-gray-700 text-gray-400"
      >
        <X className="h-4 w-4" />
      </Button>
    </header>
  );
}