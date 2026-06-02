"use client";

import { Button } from "@/components/ui/button";
import { Rocket, Sparkles } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-dashboard");

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Instant AI Access - No Login Required</span>
        </div>

        <h1 className="font-headline text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in [animation-delay:200ms]">
          Create Viral YouTube & <br />
          <span className="gradient-text">Instagram Content</span> with AI
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in [animation-delay:400ms]">
          Generate Titles, Captions, Hashtags, Scripts, Thumbnail Ideas, and Complete Content Plans in Seconds. Free and open for all creators.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in [animation-delay:600ms]">
          <Button asChild size="lg" className="gradient-bg h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/30 w-full sm:w-auto cursor-pointer">
            <Link href="/dashboard">
              <Rocket className="mr-2 h-5 w-5" /> Open Tools
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="glass h-14 px-8 text-lg font-semibold w-full sm:w-auto">
            <Link href="#tools">
              Explore Features
            </Link>
          </Button>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white glass animate-fade-in [animation-delay:800ms]">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              width={1200}
              height={800}
              alt={heroImage.description}
              className="w-full h-auto"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
