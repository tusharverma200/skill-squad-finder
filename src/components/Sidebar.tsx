
import { NavLink } from "react-router-dom";
import { 
  Sidebar as UISidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  UserPlus, 
  MessageSquare, 
  Calendar, 
  LogOut,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <UISidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <Code className="mr-2 h-6 w-6 text-primary" />
        <span className="text-lg font-bold">SkillSquad</span>
        <div className="ml-auto">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem icon={Home} to="/" label="Home" />
              <NavItem icon={Users} to="/profiles" label="Find Teammates" />
              <NavItem icon={UserPlus} to="/create-profile" label="Create Profile" />
              <NavItem icon={MessageSquare} to="/messages" label="Messages" />
              <NavItem icon={Calendar} to="/hackathons" label="Hackathons" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-4">
        <SidebarMenuButton className="w-full flex justify-center items-center rounded-md text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </UISidebar>
  );
};

const NavItem = ({ icon: Icon, to, label }: { icon: any; to: string; label: string }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={to}
          className={({ isActive }) => cn(
            "flex items-center gap-3 w-full",
            isActive && "text-primary font-medium"
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default Sidebar;
