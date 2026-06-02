"use client";

import { 
  LayoutDashboard, 
  Type, 
  Video, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  Sparkles,
  ChevronRight,
  Home,
  Search,
  Hash
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/dashboard" },
  { name: "Title Optimizer", icon: <Type className="w-5 h-5" />, href: "/dashboard/tools/optimization" },
  { name: "Keyword Finder", icon: <Search className="w-5 h-5" />, href: "/dashboard/tools/keywords" },
  { name: "Hashtag Lab", icon: <Hash className="w-5 h-5" />, href: "/dashboard/tools/hashtags" },
  { name: "Viral Short Ideas", icon: <Video className="w-5 h-5" />, href: "/dashboard/tools/short-form" },
  { name: "Script Generator", icon: <FileText className="w-5 h-5" />, href: "/dashboard/tools/script" },
  { name: "Thumbnail Ideas", icon: <ImageIcon className="w-5 h-5" />, href: "/dashboard/tools/thumbnail" },
  { name: "Content Planner", icon: <Calendar className="w-5 h-5" />, href: "/dashboard/tools/planner" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-white sticky top-0 flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tight">
            CreatorBoost <span className="gradient-text">AI</span>
          </span>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t space-y-4">
        <Link 
          href="/"
          className="flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:bg-sidebar-accent hover:text-primary transition-all"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
    </aside>
  );
}
