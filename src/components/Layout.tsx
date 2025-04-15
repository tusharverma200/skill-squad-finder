
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
