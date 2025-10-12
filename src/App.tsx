import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { 
  LayoutDashboard, 
  Smartphone, 
  BarChart3, 
  Menu,
  X
} from 'lucide-react';
import { cn } from './lib/utils';
import { Button } from './components/ui/button';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Logo } from './components/Logo';
import { Toaster } from './components/ui/toaster';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import DeviceDetails from './pages/DeviceDetails';
import Analytics from './pages/Analytics';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Devices', href: '/devices', icon: Smartphone },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

function Sidebar() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Update favicon based on theme
  useDynamicFavicon();

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/90 dark:bg-black/95 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-all duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col border-r",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          backgroundColor: 'hsl(var(--sidebar-bg))',
          borderColor: 'hsl(var(--sidebar-border))'
        }}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <div className="flex items-center">
            <Logo size="lg" showText={true} />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = item.href === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 relative',
                  isActive
                    ? 'bg-gray-800 text-white border-l-4 border-gray-600 shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-l-4 hover:border-accent-foreground/20 hover:shadow-md'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-card shadow-sm border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Logo size="md" showText={true} />
            <div className="w-8" /> {/* Spacer for centering */}
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background mobile-scroll prevent-horizontal-scroll">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/devices/:id" element={<DeviceDetails />} />
              <Route path="/devices/new" element={<Devices />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Sidebar />
        </Router>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;