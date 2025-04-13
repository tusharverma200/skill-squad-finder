
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfilesProvider } from "@/context/ProfilesContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Profiles from "./pages/Profiles";
import CreateProfile from "./pages/CreateProfile";
import ProfileDetail from "./pages/ProfileDetail";
import Messages from "./pages/Messages";
import Hackathons from "./pages/Hackathons";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProfilesProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="profiles" element={<Profiles />} />
                <Route path="profiles/:id" element={<ProfileDetail />} />
                <Route path="create-profile" element={<CreateProfile />} />
                <Route path="messages" element={<Messages />} />
                <Route path="hackathons" element={<Hackathons />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </ProfilesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
