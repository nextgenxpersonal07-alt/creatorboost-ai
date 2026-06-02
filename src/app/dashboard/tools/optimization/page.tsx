"use client";

import { useState } from "react";
import { generateContentOptimization, type GenerateContentOptimizationOutput } from "@/ai/flows/generate-content-optimization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy, Loader2, Youtube, Instagram, Hash, FileText, Type, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OptimizationTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateContentOptimizationOutput | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    niche: "",
    targetAudience: "",
    contentGoal: "increase engagement",
    platform: "YouTube" as any,
  });
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.topic) {
      toast({ title: "Please enter a main topic", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const output = await generateContentOptimization({
        ...formData,
        niche: formData.niche || "General",
        targetAudience: formData.targetAudience || "General Audience"
      });
      setResult(output);
      toast({ title: "Content optimized successfully!" });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to generate content", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
          <Type className="text-primary" /> Title & Content Optimizer
        </h1>
        <p className="text-muted-foreground">Generate high-converting titles, engaging captions, and trending hashtags in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Main Topic <span className="text-red-500">*</span></Label>
                <Input 
                  id="topic"
                  placeholder="e.g. Best 2026 AI Tools" 
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="niche">Your Niche</Label>
                <Input 
                  id="niche"
                  placeholder="e.g. Tech Review" 
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input 
                  id="audience"
                  placeholder="e.g. Aspiring Content Creators" 
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
                className="w-full h-14 rounded-2xl gradient-bg border-none font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" 
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" />
                    Generate Viral Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-2xl bg-primary/5 border border-primary/10">
            <CardContent className="p-6">
              <div className="flex gap-3 items-start">
                <Zap className="w-5 h-5 text-primary mt-1" />
                <div className="text-sm">
                  <p className="font-bold text-primary mb-1">Pro Tip</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Try using high-intent keywords in your topic to help the AI generate more searchable titles.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-[500px] border-2 border-dashed rounded-3xl text-center p-10 glass">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ready to optimize?</h3>
              <p className="text-muted-foreground max-w-sm">
                Fill out the project details and click the <b>Generate</b> button to see viral titles, captions, and hashtags.
              </p>
            </div>
          )}

          {loading && (
            <div className="space-y-6">
              <Card className="h-64 border-none shadow-sm rounded-2xl bg-gray-100/50 animate-pulse" />
              <Card className="h-48 border-none shadow-sm rounded-2xl bg-gray-100/50 animate-pulse" />
            </div>
          )}

          {result && (
            <Tabs defaultValue="titles" className="w-full">
              <TabsList className="w-full grid grid-cols-4 h-14 p-1 rounded-2xl mb-6 bg-white border">
                <TabsTrigger value="titles" className="rounded-xl font-bold h-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Type className="mr-2 w-4 h-4" /> Titles
                </TabsTrigger>
                <TabsTrigger value="captions" className="rounded-xl font-bold h-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  <FileText className="mr-2 w-4 h-4" /> Captions
                </TabsTrigger>
                <TabsTrigger value="hashtags" className="rounded-xl font-bold h-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Hash className="mr-2 w-4 h-4" /> Hashtags
                </TabsTrigger>
                {result.videoDescription && (
                  <TabsTrigger value="description" className="rounded-xl font-bold h-full data-[state=active]:bg-primary data-[state=active]:text-white">
                    <Youtube className="mr-2 w-4 h-4" /> SEO
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="titles">
                <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" /> 10 Viral Titles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {result.titles.map((title, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                          <span className="font-medium pr-4">{title}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => copyToClipboard(title)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="captions">
                <div className="space-y-6">
                  {(['short', 'medium', 'long'] as const).map((style) => (
                    <Card key={style} className="border-none shadow-sm rounded-2xl">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-md capitalize">{style} Style Caption</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.captions[style])} className="rounded-lg h-8">
                          <Copy className="mr-2 w-3 h-3" /> Copy
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {result.captions[style]}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hashtags">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['trending', 'niche', 'highReach'] as const).map((category) => (
                    <Card key={category} className="border-none shadow-sm rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase text-primary tracking-wider">
                          {category.replace(/([A-Z])/g, ' $1')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.hashtags[category].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full text-xs font-bold" 
                          onClick={() => copyToClipboard(result.hashtags[category].map(t => `#${t}`).join(' '))}
                        >
                          Copy All
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {result.videoDescription && (
                <TabsContent value="description">
                  <Card className="border-none shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-md">SEO Video Description</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.videoDescription || "")} className="rounded-lg h-8">
                        <Copy className="mr-2 w-3 h-3" /> Copy
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 p-6 rounded-xl text-sm font-mono whitespace-pre-wrap leading-relaxed">
                        {result.videoDescription}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
