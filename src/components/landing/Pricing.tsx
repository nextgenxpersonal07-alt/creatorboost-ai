import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl font-bold mb-4">
          Simple Plans for <span className="gradient-text">Every Creator</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg">
          Start for free and scale your reach with professional AI tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-3xl border glass text-left relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">₹0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>10 Generations Daily</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Standard AI Suite</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Public Templates</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full h-12 rounded-xl">
              <Link href="/dashboard">Try Tools Now</Link>
            </Button>
          </div>

          {/* 7 Rupee Plan */}
          <div className="p-8 rounded-3xl border-2 border-primary glass text-left relative overflow-hidden group shadow-2xl shadow-primary/10">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-bold rounded-bl-xl">POPULAR</div>
            <h3 className="text-xl font-bold mb-2">Pro Creator</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">₹7</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span className="font-medium">Unlimited Generations</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Priority AI Access</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Keyword & Hashtag Lab</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Content Strategy Planner</span>
              </li>
            </ul>
            <Button asChild className="w-full h-12 rounded-xl gradient-bg border-none shadow-lg shadow-primary/30">
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </div>

          {/* Agency Plan */}
          <div className="p-8 rounded-3xl border glass text-left relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-2">Agency</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">₹99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Multi-Channel Sync</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Bulk Script Export</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Team Collaboration</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-500" />
                <span>24/7 Dedicated Support</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full h-12 rounded-xl">
              <Link href="/dashboard">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
