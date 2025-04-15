
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfilesProvider } from "@/context/ProfilesContext";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Profiles from "./pages/Profiles";
import CreateProfile from "./pages/CreateProfile";
import ProfileDetail from "./pages/ProfileDetail";
import Messages from "./pages/Messages";
import Hackathons from "./pages/Hackathons";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <ProfilesProvider>
                <SidebarProvider>
                  <Routes>
                    {/* Auth Routes */}
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                    
                    {/* Main Layout */}
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Index />} />
                      <Route path="profiles" element={
                        <ProtectedRoute>
                          <Profiles />
                        </ProtectedRoute>
                      } />
                      <Route path="profiles/:id" element={
                        <ProtectedRoute>
                          <ProfileDetail />
                        </ProtectedRoute>
                      } />
                      <Route path="create-profile" element={
                        <ProtectedRoute>
                          <CreateProfile />
                        </ProtectedRoute>
                      } />
                      <Route path="messages" element={
                        <ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>
                      } />
                      <Route path="hackathons" element={
                        <ProtectedRoute>
                          <Hackathons />
                        </ProtectedRoute>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </SidebarProvider>
              </ProfilesProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
