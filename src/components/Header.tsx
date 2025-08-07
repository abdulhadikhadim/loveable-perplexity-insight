import { Share2 } from "lucide-react";
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
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-bold text-foreground">Loveable AI</h1>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleShare}
        className="hover:bg-accent"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </header>
  );
}