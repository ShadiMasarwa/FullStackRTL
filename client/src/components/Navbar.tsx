import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { GraduationCap, LogOut, History, LayoutDashboard, Award } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2 -mr-3" data-testid="link-home">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">FullStackEDU</span>
          </Link>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={() => setLocation('/login')} data-testid="button-login">
                  התחבר
                </Button>
                <Button onClick={() => setLocation('/register')} data-testid="button-register">
                  הירשם
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2" 
                  onClick={() => setLocation('/dashboard')} 
                  data-testid="link-dashboard"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">לוח הבקרה</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2" 
                  onClick={() => setLocation('/history')} 
                  data-testid="link-history"
                >
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">היסטוריה</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2" 
                  onClick={() => setLocation('/certificates')} 
                  data-testid="link-certificates"
                >
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">תעודות</span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full" data-testid="button-user-menu">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(user?.displayName || 'U')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium text-right">{user?.displayName}</p>
                        <p className="text-xs text-muted-foreground text-right">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive" data-testid="button-logout">
                      <LogOut className="ml-2 h-4 w-4" />
                      <span>התנתק</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
