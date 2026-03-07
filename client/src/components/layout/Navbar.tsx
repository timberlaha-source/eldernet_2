import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, Menu, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT US" },
    { href: "/courses", label: "COURSES" },
    { href: "/faq", label: "FAQs" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className="h-[75px] bg-background w-full flex items-center border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-[1200px] w-full mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <a className="text-[24px] font-bold text-secondary tracking-tight">
            ElderNet
          </a>
        </Link>
        
        <div className="flex items-center gap-[32px]">
          <div className="hidden md:flex items-center gap-[32px]">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a 
                  className={`text-[18px] font-medium py-[12px] transition-all
                    ${location === link.href ? "text-primary border-b-2 border-primary" : "text-secondary hover:text-primary hover:border-b-2 hover:border-primary"}
                  `}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm hover:shadow-md transition-all outline-none">
              <Menu className="w-5 h-5 text-secondary" />
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="w-5 h-5 text-secondary" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-[12px]">
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <div className="flex items-center gap-3 cursor-pointer py-2 text-[16px] font-medium text-secondary">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <div className="flex items-center gap-3 cursor-pointer py-2 text-[16px] font-medium text-secondary">
                    <LogIn className="w-4 h-4" />
                    Login
                  </div>
                </Link>
              </DropdownMenuItem>
              <div className="h-px bg-border my-1 md:hidden" />
              {links.map((link) => (
                <DropdownMenuItem key={link.href} asChild className="md:hidden">
                  <Link href={link.href}>
                    <div className="cursor-pointer py-2 text-[16px] font-medium text-secondary">
                      {link.label}
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
