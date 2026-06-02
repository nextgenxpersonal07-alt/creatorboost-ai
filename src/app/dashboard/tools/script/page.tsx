"use client";

import { useState } from "react";
import { generateVideoScript, type GenerateVideoScriptOutput } from "@/ai/flows/generate-video-script-flow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, Loader2, Copy, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function ScriptGeneratorTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateVideoScriptOutput | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    niche: "",
    targetAudience: "",
    contentGoal: "educate",
    platform: "YouTube" as any,
  });
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.topic) {
      toast({ title: "Please enter a video topic", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const output = await generateVideoScript({
        ...formData,
        niche: formData.niche || "General",
        targetAudience: formData.targetAudience || "Broad Audience"
      });
      setResult(output);
      toast({ title: "Video script generated!" });
    } catch (error) {
      toast({ title: "Failed to generate script", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copySection = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
          <FileText className="text-primary" /> Script Architect Lab
        </h1>
        <p className="text-muted-foreground">Professional video scripts with proven storytelling frameworks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-sm rounded-2xl h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Script Blueprint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Video Topic</Label>
              <Input 
                placeholder="What is your video about?" 
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
                  <SelectItem value="YouTube">YouTube (Long-form)</SelectItem>
                  <SelectItem value="Shorts">YouTube Shorts</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="Reels">Instagram Reels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Primary Goal</Label>
              <Select 
                value={formData.contentGoal}
                onValueChange={(val) => setFormData({ ...formData, contentGoal: val })}
              >
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educate">Educate & Inform</SelectItem>
                  <SelectItem value="entertain">Entertain</SelectItem>
                  <SelectItem value="convert">Drive Sales/Conversions</SelectItem>
                  <SelectItem value="inspire">Inspire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Audience (Optional)</Label>
              <Textarea 
                placeholder="Describe your audience..."
                className="rounded-xl min-h-[100px]"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              />
            </div>
            <Button 
              className="w-full h-12 rounded-xl gradient-bg border-none font-bold text-lg" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              Generate Full Script
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-[600px] border-2 border-dashed rounded-3xl text-center p-10 glass">
              <FileText className="w-16 h-16 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-bold mb-2">No script active</h3>
              <p className="text-muted-foreground max-w-sm">Use the blueprint tool on the left to start writing your masterpiece.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-6 animate-pulse">
              <Card className="h-20 rounded-2xl bg-gray-50" />
              <Card className="h-32 rounded-2xl bg-gray-50" />
              <Card className="h-96 rounded-2xl bg-gray-50" />
              <Card className="h-32 rounded-2xl bg-gray-50" />
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-xl font-bold">Script Draft</h2>
                <Button variant="outline" className="rounded-xl">
                  <Save className="mr-2 w-4 h-4" /> Save to Projects
                </Button>
              </div>

              <div className="space-y-6">
                <ScriptSection title="Viral Hook" content={result.hook} onCopy={copySection} />
                <ScriptSection title="Introduction" content={result.introduction} onCopy={copySection} />
                <ScriptSection title="Main Content" content={result.mainContent} onCopy={copySection} isMain />
                <ScriptSection title="Call To Action" content={result.callToAction} onCopy={copySection} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScriptSection({ title, content, onCopy, isMain = false }: { title: string, content: string, onCopy: (s: string) => void, isMain?: boolean }) {
  return (
    <Card className="border-none shadow-sm rounded-2xl group relative">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50 py-4 px-6">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">{title}</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onCopy(content)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <p className={cn(
          "leading-relaxed whitespace-pre-wrap",
          isMain ? "text-base text-gray-800" : "text-muted-foreground"
        )}>
          {content}
        </p>
      </CardContent>
    </Card>
  );
}
