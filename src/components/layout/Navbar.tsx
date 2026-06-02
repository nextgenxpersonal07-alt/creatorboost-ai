"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">
            CreatorBoost <span className="gradient-text">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
          <Link href="#tools" className="text-muted-foreground hover:text-primary transition-colors">Tools</Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button className="gradient-bg border-none shadow-md shadow-primary/20 font-medium h-10 px-6">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
