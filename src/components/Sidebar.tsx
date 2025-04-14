
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { 
  LucideHome, 
  Users, 
  MessageSquare, 
  Award, 
  Menu, 
  UserPlus, 
  LogIn,
  LogOut
} from 'lucide-react';

const navItems = [
  { path: '/', name: 'Home', icon: <LucideHome className="shrink-0" /> },
  { path: '/profiles', name: 'Profiles', icon: <Users className="shrink-0" /> },
  { path: '/messages', name: 'Messages', icon: <MessageSquare className="shrink-0" /> },
  { path: '/hackathons', name: 'Hackathons', icon: <Award className="shrink-0" /> },
];

const Sidebar = () => {
  const location = useLocation();
  const { open, setOpen } = useSidebar();
  const { user, signOut } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu />
        </Button>
      )}
      
      <aside
        className={cn(
          'border-r bg-background fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0',
          open || !isMobile ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="px-4 py-6 border-b">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground p-1 rounded font-bold">SF</span>
              <span className="font-semibold text-lg">Skill Squad Finder</span>
            </Link>
          </div>
          
          <nav className="flex-1 overflow-auto py-6">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {user && (
                <li>
                  <Link
                    to="/create-profile"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <UserPlus className="shrink-0" />
                    Create Profile
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          
          <div className="border-t p-4">
            {user ? (
              <Button 
                variant="outline" 
                className="w-full flex justify-center items-center gap-2"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button 
                  variant="default" 
                  className="w-full flex justify-center items-center gap-2"
                  asChild
                >
                  <Link to="/auth/signin">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-center items-center gap-2"
                  asChild
                >
                  <Link to="/auth/signup">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
      
      <div 
        className={cn(
          'md:ml-64 transition-all duration-200',
          open && isMobile ? 'ml-64 opacity-30' : 'ml-0 opacity-100'
        )}
        onClick={() => isMobile && open && setOpen(false)} 
      />
    </>
  );
};

export default Sidebar;
