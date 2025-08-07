import { 
  Home, 
  Settings,
  Plus,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const medicalHistoryItems = [
  "Differential diagnosis for chest...",
  "ACE inhibitor dosing guidelines",
  "Latest hypertension treatment...",
  "Drug interactions with metformin"
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-r border-border bg-gray-900`}>
      <SidebarContent className="bg-gray-900">
        {/* ClarosMed Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1 rounded">
              <Plus className="h-4 w-4 text-white" />
            </div>
            {!collapsed && <span className="text-white font-semibold">ClarosMed</span>}
          </div>
        </div>

        {/* Home */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-gray-700 text-white bg-gray-700">
                  <Home className="h-4 w-4" />
                  {!collapsed && <span>Home</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* History */}
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "hidden" : "block"} text-gray-400 text-sm px-4`}>
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {medicalHistoryItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="hover:bg-gray-700 text-gray-300 justify-start text-left">
                    {!collapsed && <span className="truncate">{item}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto border-t border-gray-700">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-gray-700 text-gray-300">
                    <Settings className="h-4 w-4" />
                    {!collapsed && <span>Settings</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {/* Doctor Profile */}
          {!collapsed && (
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Dr. Smith</div>
                  <div className="text-gray-400 text-xs">Cardiologist</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}