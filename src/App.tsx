import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Tenants from "./pages/Tenants";
import Owners from "./pages/Owners";
import Properties from "./pages/Properties";
import Contracts from "./pages/Contracts";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Backups from "./pages/Backups";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } />
            <Route path="/tenants" element={
              <DashboardLayout>
                <Tenants />
              </DashboardLayout>
            } />
            <Route path="/users" element={
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            } />
            <Route path="/owners" element={
              <DashboardLayout>
                <Owners />
              </DashboardLayout>
            } />
            <Route path="/properties" element={
              <DashboardLayout>
                <Properties />
              </DashboardLayout>
            } />
            <Route path="/contracts" element={
              <DashboardLayout>
                <Contracts />
              </DashboardLayout>
            } />
            <Route path="/payments" element={
              <DashboardLayout>
                <Payments />
              </DashboardLayout>
            } />
            <Route path="/reports" element={
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            } />
            <Route path="/notifications" element={
              <DashboardLayout>
                <Notifications />
              </DashboardLayout>
            } />
            <Route path="/backups" element={
              <DashboardLayout>
                <Backups />
              </DashboardLayout>
            } />
            <Route path="/settings" element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
