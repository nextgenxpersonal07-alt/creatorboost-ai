"use client";

import { useState } from "react";
import { generateHashtags, type GenerateHashtagsOutput } from "@/ai/flows/generate-hashtags-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, Sparkles, Loader2, Copy, Zap, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HashtagGeneratorTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateHashtagsOutput | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    niche: "",
    platform: "Instagram" as any,
    count: 15,
  });
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.topic) {
      toast({ title: "Please enter a topic", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const output = await generateHashtags(formData);
      setResult(output);
      toast({ title: "Hashtags generated!" });
    } catch (error) {
      toast({ title: "Failed to generate hashtags", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyAll = (tags: string[]) => {
    navigator.clipboard.writeText(tags.map(t => `#${t}`).join(' '));
    toast({ title: "All tags copied to clipboard!" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
          <Hash className="text-primary" /> Hashtag Generator Pro
        </h1>
        <p className="text-muted-foreground">Strategic hashtag sets for Instagram, TikTok, and more.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-sm rounded-2xl h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Targeting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Post Topic</Label>
              <Input 
                placeholder="What is your post about?" 
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
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
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="YouTube Shorts">YouTube Shorts</SelectItem>
                  <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Niche</Label>
              <Input 
                placeholder="e.g. Fashion, SaaS, Gaming" 
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <Label>Tag Count: {formData.count}</Label>
              </div>
              <Slider 
                min={5} 
                max={30} 
                step={1} 
                value={[formData.count]} 
                onValueChange={(val) => setFormData({ ...formData, count: val[0] })}
              />
            </div>
            <Button 
              className="w-full h-12 rounded-xl gradient-bg border-none font-bold text-lg" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              Generate Hashtags
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-[500px] border-2 border-dashed rounded-3xl text-center p-10 glass">
              <Hash className="w-16 h-16 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-bold mb-2">Hashtag Lab</h3>
              <p className="text-muted-foreground max-w-sm">Mix trending, niche, and low-competition tags for explosive reach.</p>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
              <Card className="h-48 rounded-2xl bg-gray-50" />
              <Card className="h-48 rounded-2xl bg-gray-50" />
              <Card className="h-48 rounded-2xl bg-gray-50 md:col-span-2" />
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <HashtagCard title="Trending" tags={result.trending} onCopy={copyAll} color="text-pink-500" />
                <HashtagCard title="Niche Specific" tags={result.nicheSpecific} onCopy={copyAll} color="text-purple-500" />
                <HashtagCard title="Low Competition" tags={result.lowCompetition} onCopy={copyAll} color="text-blue-500" />
              </div>

              <Card className="border-none shadow-sm rounded-2xl bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-md flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> Growth Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.hashtagStrategy}
                  </p>
                </CardContent>
              </Card>

              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl font-bold"
                onClick={() => copyAll([...result.trending, ...result.nicheSpecific, ...result.lowCompetition])}
              >
                <Copy className="mr-2 w-4 h-4" /> Copy All {formData.count} Hashtags
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HashtagCard({ title, tags, onCopy, color }: { title: string, tags: string[], onCopy: (t: string[]) => void, color: string }) {
  return (
    <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className={`text-xs font-bold uppercase tracking-widest ${color}`}>{title}</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => onCopy(tags)} className="h-6 w-6">
          <Copy className="w-3 h-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-white border rounded-lg text-[11px] font-medium text-gray-600">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
