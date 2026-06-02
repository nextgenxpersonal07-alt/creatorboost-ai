"use client";

import { useState } from "react";
import { generateKeywords, type GenerateKeywordsOutput } from "@/ai/flows/generate-keywords-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, Search, Copy, CheckCircle2, TrendingUp, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function KeywordGeneratorTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateKeywordsOutput | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    niche: "",
    platform: "YouTube" as any,
    intent: "Informational" as any,
  });
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.topic) {
      toast({ title: "Please enter a topic", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const output = await generateKeywords(formData);
      setResult(output);
      toast({ title: "Keywords generated successfully!" });
    } catch (error) {
      toast({ title: "Generation failed", variant: "destructive" });
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
          <Search className="text-primary" /> SEO Keyword Generator
        </h1>
        <p className="text-muted-foreground">Find the best keywords to rank your content and reach more viewers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-sm rounded-2xl h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Keyword Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Core Topic</Label>
              <Input 
                placeholder="e.g. Keto Diet, iPhone 16 Review" 
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Niche</Label>
              <Input 
                placeholder="e.g. Health & Fitness, Technology" 
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
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Google">Google / Blog</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Pinterest">Pinterest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Search Intent</Label>
              <Select 
                value={formData.intent}
                onValueChange={(val) => setFormData({ ...formData, intent: val })}
              >
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Informational">Informational</SelectItem>
                  <SelectItem value="Educational">Educational</SelectItem>
                  <SelectItem value="Transactional">Transactional (Sales)</SelectItem>
                  <SelectItem value="Viral">Viral / Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full h-12 rounded-xl gradient-bg border-none font-bold text-lg shadow-lg shadow-primary/20" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              Generate Keywords
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-[500px] border-2 border-dashed rounded-3xl text-center p-10 glass">
              <Search className="w-16 h-16 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-bold mb-2">No keywords yet</h3>
              <p className="text-muted-foreground max-w-sm">Enter your topic and parameters to discover high-ranking keywords.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-6 animate-pulse">
              <Card className="h-48 rounded-2xl bg-gray-50" />
              <Card className="h-64 rounded-2xl bg-gray-50" />
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary/5 border-b py-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" /> Primary Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {result.primaryKeywords.map((kw, i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 group">
                        <div className="space-y-1">
                          <p className="font-bold text-gray-900">{kw.keyword}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-[10px] uppercase font-bold">Vol: {kw.volume}</Badge>
                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-orange-500 border-orange-200">Diff: {kw.difficulty}</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(kw.keyword)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-md flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> Long-Tail Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.longTailKeywords.map((kw, i) => (
                      <div key={i} className="text-sm p-2 bg-gray-50 rounded-lg flex justify-between items-center group">
                        <span className="text-muted-foreground">{kw}</span>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(kw)} className="h-6 w-6 opacity-0 group-hover:opacity-100">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-2xl bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-md flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-500" /> Strategy Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-800 leading-relaxed italic">
                      {result.seoTips}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
