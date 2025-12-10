import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Button } from '@/components/shadcn/button';
import { Badge } from '@/components/shadcn/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import { Menu, X, LogOut, User, Video, Home, MessageSquare, Sparkles } from 'lucide-react';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsMenuOpen(false);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }

  const NavLink = ({ to, children, icon: Icon, onClick }) => (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
      onClick={onClick}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-primary">EzClip</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {isAuthenticated ? (
            <>
              <NavLink to="/" icon={Home}>Home</NavLink>
              <NavLink to="/generate-video" icon={Video}>Generate</NavLink>
              <NavLink to="/my-creations" icon={Sparkles}>My Creations</NavLink>
              <NavLink to="/feedbacks" icon={MessageSquare}>Feedbacks</NavLink>
            </>
          ) : (
            <NavLink to="/feedbacks" icon={MessageSquare}>Feedback</NavLink>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium max-w-[150px] truncate">
                    {userInfo?.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{userInfo?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                EzClip
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium truncate">{userInfo?.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <NavLink to="/" icon={Home} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/generate-video" icon={Video} onClick={() => setIsMenuOpen(false)}>Generate Video</NavLink>
                    <NavLink to="/my-creations" icon={Sparkles} onClick={() => setIsMenuOpen(false)}>My Creations</NavLink>
                    <NavLink to="/feedbacks" icon={MessageSquare} onClick={() => setIsMenuOpen(false)}>Feedbacks</NavLink>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="destructive" className="w-full" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-1">
                    <NavLink to="/feedbacks" icon={MessageSquare} onClick={() => setIsMenuOpen(false)}>Feedback</NavLink>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button variant="outline" className="w-full" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
                      Login
                    </Button>
                    <Button className="w-full" onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>
                      Sign Up
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default Header