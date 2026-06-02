"use client";

import { useState } from "react";
import { generateShortFormIdeas, type GenerateShortFormIdeasOutput } from "@/ai/flows/generate-short-form-ideas";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Video, Loader2, Music, Zap, MousePointer2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function ShortFormTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateShortFormIdeasOutput | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    niche: "",
    targetAudience: "",
    platform: "TikTok" as any,
    moodTone: "Funny",
  });
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.topic || !formData.niche) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const output = await generateShortFormIdeas(formData);
      setResult(output);
      toast({ title: "Viral ideas generated!" });
    } catch (error) {
      toast({ title: "Failed to generate ideas", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
          <Video className="text-primary" /> Short-Form Idea Factory
        </h1>
        <p className="text-muted-foreground">Get viral concepts for TikTok, Reels, and YouTube Shorts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 border-none shadow-sm rounded-2xl h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Project Scope</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Main Topic</Label>
              <Input 
                placeholder="e.g. Life Hacks" 
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Your Niche</Label>
              <Input 
                placeholder="e.g. Comedy, Tech" 
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select 
                value={formData.platform}
                onValueChange={(val) => setFormData({ ...formData, platform: val })}
              >
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="Instagram Reels">Instagram Reels</SelectItem>
                  <SelectItem value="YouTube Shorts">YouTube Shorts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select 
                value={formData.moodTone}
                onValueChange={(val) => setFormData({ ...formData, moodTone: val })}
              >
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Funny">Funny & Relatable</SelectItem>
                  <SelectItem value="Educational">Educational</SelectItem>
                  <SelectItem value="Inspiring">Inspiring</SelectItem>
                  <SelectItem value="Shocking">Shocking/Surprising</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full h-12 rounded-xl gradient-bg border-none font-bold" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              Generate Viral Ideas
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-[600px] border-2 border-dashed rounded-3xl text-center p-10 glass">
              <Video className="w-16 h-16 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-bold mb-2">No ideas generated</h3>
              <p className="text-muted-foreground max-w-sm">Fill in the details to receive 3 fresh, viral-ready short-form video concepts.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-6 animate-pulse">
              <Card className="h-48 rounded-2xl bg-gray-50" />
              <Card className="h-48 rounded-2xl bg-gray-50" />
              <Card className="h-48 rounded-2xl bg-gray-50" />
            </div>
          )}

          {result && (
            <div className="grid grid-cols-1 gap-8">
              {result.ideas.map((idea, idx) => (
                <Card key={idx} className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-primary/5 border-b py-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-primary">{idea.title}</CardTitle>
                      <Badge className="bg-primary hover:bg-primary/90">IDEA {idx + 1}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-bold flex items-center gap-2 text-gray-900">
                        <Zap className="w-4 h-4 text-orange-500" /> Opening Hooks
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {idea.hooks.map((hook, hIdx) => (
                          <div key={hIdx} className="p-3 bg-orange-50 border border-orange-100 rounded-xl text-sm italic">
                            "{hook}"
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold flex items-center gap-2 text-gray-900">
                        <MousePointer2 className="w-4 h-4 text-blue-500" /> Concept Details
                      </h4>
                      <p className="text-muted-foreground leading-relaxed bg-gray-50 p-4 rounded-xl border">
                        {idea.concept}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <h4 className="font-bold flex items-center gap-2 text-gray-900">
                          <Music className="w-4 h-4 text-purple-500" /> Audio Suggestions
                        </h4>
                        <ul className="space-y-2">
                          {idea.trendingSounds.map((sound, sIdx) => (
                            <li key={sIdx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                              {sound}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900">Final Call to Action</h4>
                        <div className="p-3 bg-primary/5 rounded-xl text-sm font-bold text-primary border border-primary/10">
                          {idea.callToAction}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
