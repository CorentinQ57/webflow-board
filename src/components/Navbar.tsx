
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Layout, 
  Settings, 
  Plus, 
  Search, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "Tableaux de bord", icon: Home, path: "/" },
    { title: "Projets", icon: Layout, path: "/projects" },
    { title: "Paramètres", icon: Settings, path: "/settings" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-2 bg-background/80 backdrop-blur-lg shadow-sm" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="font-bold text-xl flex items-center gap-2 text-primary"
            >
              <span className="bg-primary text-white p-1 rounded">WP</span>
              <span>WebProjects</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "text-primary font-medium"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon size={18} />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full focus-ring">
              <Search size={18} />
            </Button>
            
            <Button className="rounded-full focus-ring">
              <Plus size={18} className="mr-2" />
              <span>Nouveau</span>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full md:hidden focus-ring">
                  <Menu size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="mb-4">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigation du site
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                        location.pathname === item.path
                          ? "text-primary font-medium bg-muted"
                          : "text-foreground/80 hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
