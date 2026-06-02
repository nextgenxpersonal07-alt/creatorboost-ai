"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Sparkles, Save, Layout, Zap, Search, Hash, Video, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { name: "Generations Used", value: "0 / 20", icon: <Zap className="text-yellow-500" />, sub: "Daily Free Limit" },
    { name: "Current Plan", value: "Starter", icon: <Save className="text-blue-500" />, sub: "Upgrade for ₹7" },
    { name: "Growth Tools", value: "10+", icon: <Layout className="text-green-500" />, sub: "Full AI Access" },
  ];

  const quickTools = [
    { title: "Keywords", href: "/dashboard/tools/keywords", color: "text-blue-500", bg: "bg-blue-50", icon: <Search className="w-6 h-6" /> },
    { title: "Hashtags", href: "/dashboard/tools/hashtags", color: "text-pink-500", bg: "bg-pink-50", icon: <Hash className="w-6 h-6" /> },
    { title: "Optimization", href: "/dashboard/tools/optimization", color: "text-red-500", bg: "bg-red-50", icon: <Sparkles className="w-6 h-6" /> },
    { title: "Scripts", href: "/dashboard/tools/script", color: "text-purple-500", bg: "bg-purple-50", icon: <FileText className="w-6 h-6" /> },
    { title: "Shorts Ideas", href: "/dashboard/tools/short-form", color: "text-indigo-500", bg: "bg-indigo-50", icon: <Video className="w-6 h-6" /> },
    { title: "Planner", href: "/dashboard/tools/planner", color: "text-green-500", bg: "bg-green-50", icon: <Calendar className="w-6 h-6" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold mb-2">
            Welcome, <span className="gradient-text">{user?.displayName || "Creator"}</span>! 👋
          </h1>
          <p className="text-muted-foreground">Instantly generate viral content strategies and ranking assets.</p>
        </div>
        <Link href="/dashboard/tools/optimization">
          <Button className="gradient-bg border-none shadow-lg shadow-primary/20 h-12 px-6 font-bold">
            <Sparkles className="mr-2 w-5 h-5" /> Start New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.name}</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-xl font-bold">Specialized Creator Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTools.map((tool) => (
              <Link key={tool.title} href={tool.href}>
                <div className="p-5 rounded-2xl border glass hover:border-primary transition-all flex flex-col items-start gap-4 group">
                  <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <span className="font-bold text-base">{tool.title}</span>
                </div>
              </Link>
            ))}
          </div>

          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle>Viral Growth Strategy</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground mb-4">SEO keywords combined with trending hashtags are the secret to algorithm discovery.</p>
              <Button variant="outline" className="rounded-xl">Learn More</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="font-headline text-xl font-bold">Creator Status</h2>
          <Card className="border-none shadow-sm rounded-2xl gradient-bg text-white">
            <CardContent className="p-8">
              <p className="text-sm font-medium opacity-80 mb-2">LIMITED TIME OFFER</p>
              <h3 className="text-3xl font-bold mb-6">Pro Creator Plan</h3>
              <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden mb-6">
                <div className="bg-white h-full w-[100%] shadow-lg shadow-white/50" />
              </div>
              <p className="text-sm opacity-90 leading-relaxed mb-8">
                Get unlimited AI generations, priority access, and specialized SEO tools for only ₹7/month.
              </p>
              <Link href="/#pricing" className="block">
                <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold h-12 rounded-xl">
                  Upgrade for ₹7
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
