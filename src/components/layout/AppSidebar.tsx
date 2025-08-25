import { 
  Building2, 
  Users, 
  Home, 
  FileText, 
  CreditCard, 
  PieChart, 
  Bell, 
  Settings,
  UserCog,
  Building,
  HardDrive
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

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

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    group: "Principal"
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: UserCog,
    group: "Administración"
  },
  {
    title: "Inquilinos",
    url: "/tenants",
    icon: Users,
    group: "Gestión"
  },
  {
    title: "Propietarios",
    url: "/owners",
    icon: Building,
    group: "Gestión"
  },
  {
    title: "Inmuebles",
    url: "/properties",
    icon: Building2,
    group: "Gestión"
  },
  {
    title: "Contratos",
    url: "/contracts",
    icon: FileText,
    group: "Gestión"
  },
  {
    title: "Pagos",
    url: "/payments",
    icon: CreditCard,
    group: "Financiero"
  },
  {
    title: "Reportes",
    url: "/reports",
    icon: PieChart,
    group: "Financiero"
  },
  {
    title: "Notificaciones",
    url: "/notifications",
    icon: Bell,
    group: "Sistema"
  },
  {
    title: "Backups",
    url: "/backups",
    icon: HardDrive,
    group: "Sistema"
  },
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
    group: "Sistema"
  }
];

const groupedItems = menuItems.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof menuItems>);

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">InmoGestor</h2>
                <p className="text-xs text-sidebar-foreground/70">v1.0</p>
              </div>
            )}
          </div>
        </div>

        {Object.entries(groupedItems).map(([groupName, items]) => (
          <SidebarGroup key={groupName}>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-6 py-2">
                {groupName}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="px-3">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`w-full justify-start rounded-lg transition-smooth hover:bg-accent ${
                        isActive(item.url) 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}