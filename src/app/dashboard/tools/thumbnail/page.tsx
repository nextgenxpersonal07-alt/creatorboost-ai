"use client";

import { useState } from "react";
import { generateThumbnailConcept, type GenerateThumbnailConceptOutput } from "@/ai/flows/generate-thumbnail-concept-flow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Image as ImageIcon, Loader2, Lightbulb, Palette, Layout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ThumbnailGeneratorTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateThumbnailConceptOutput | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    niche: "",
    targetAudience: "",
    contentGoal: "increase engagement",
    platform: "YouTube" as any,
  });
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.topic || !formData.niche) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const output = await generateThumbnailConcept(formData);
      setResult(output);
      toast({ title: "Thumbnail concepts generated!" });
    } catch (error) {
      toast({ title: "Failed to generate concepts", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
          <ImageIcon className="text-primary" /> Thumbnail Visualizer
        </h1>
        <p className="text-muted-foreground">Strategic thumbnail concepts designed to skyrocket your click-through rate.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-sm rounded-2xl h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Visual Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Content Topic</Label>
              <Input 
                placeholder="What is the video about?" 
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Niche</Label>
              <Input 
                placeholder="e.g. Gaming, Finance" 
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Input 
                placeholder="e.g. Beginners, Pros" 
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
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
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Shorts">Shorts</SelectItem>
                  <SelectItem value="Reels">Reels</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full h-12 rounded-xl gradient-bg border-none font-bold text-lg" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              Generate Concepts
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-[600px] border-2 border-dashed rounded-3xl text-center p-10 glass">
              <ImageIcon className="w-16 h-16 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-bold mb-2">No concepts generated</h3>
              <p className="text-muted-foreground max-w-sm">Fill in the details to receive high-CTR thumbnail ideas and design tips.</p>
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
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary/5 border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" /> Text Overlay Ideas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    {result.thumbnailTextIdeas.map((text, i) => (
                      <div key={i} className="px-4 py-2 bg-white border-2 border-primary/20 rounded-xl font-bold text-primary">
                        {text}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-secondary/5 border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Palette className="w-5 h-5 text-secondary" /> Visual Composition
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {result.thumbnailDesignSuggestions.map((suggestion, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary text-xs font-bold">
                          {i + 1}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{suggestion}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-accent/5 border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" /> Emotional Hooks
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {result.emotionSuggestions.map((emotion, i) => (
                      <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                        {emotion}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
