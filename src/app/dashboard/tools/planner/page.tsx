"use client";

import { useState } from "react";
import { generateContentPlan, type GenerateContentPlanOutput } from "@/ai/flows/generate-content-plan-flow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Calendar, Loader2, Download, Table as TableIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ContentPlannerTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateContentPlanOutput | null>(null);
  const [formData, setFormData] = useState({
    niche: "",
    targetAudience: "",
    contentGoal: "increase engagement",
    planDuration: "7 Day Plan" as any,
    platformSelection: [] as string[],
  });
  const { toast } = useToast();

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platformSelection: prev.platformSelection.includes(platform)
        ? prev.platformSelection.filter(p => p !== platform)
        : [...prev.platformSelection, platform]
    }));
  };

  const handleGenerate = async () => {
    if (!formData.niche || formData.platformSelection.length === 0) {
      toast({ title: "Please fill in all fields and select at least one platform", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const output = await generateContentPlan(formData);
      setResult(output);
      toast({ title: "Strategic content plan generated!" });
    } catch (error) {
      toast({ title: "Failed to generate plan", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
          <Calendar className="text-primary" /> Content Planner
        </h1>
        <p className="text-muted-foreground">Map out your content strategy with AI-powered weekly and monthly calendars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 border-none shadow-sm rounded-2xl h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Plan Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Niche</Label>
              <Input 
                placeholder="e.g. Finance, Cooking" 
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Input 
                placeholder="e.g. College Students" 
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select 
                value={formData.planDuration}
                onValueChange={(val) => setFormData({ ...formData, planDuration: val })}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7 Day Plan">7 Day Plan</SelectItem>
                  <SelectItem value="30 Day Plan">30 Day Plan</SelectItem>
                  <SelectItem value="90 Day Plan">90 Day Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Platforms</Label>
              <div className="grid grid-cols-1 gap-2">
                {['YouTube', 'Instagram', 'Shorts', 'Reels', 'TikTok'].map(platform => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox 
                      id={platform} 
                      checked={formData.platformSelection.includes(platform)}
                      onCheckedChange={() => handlePlatformToggle(platform)}
                    />
                    <label htmlFor={platform} className="text-sm font-medium leading-none cursor-pointer">{platform}</label>
                  </div>
                ))}
              </div>
            </div>
            <Button 
              className="w-full h-12 rounded-xl gradient-bg border-none font-bold" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              Generate Plan
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {loading && (
            <div className="flex flex-col items-center justify-center h-[500px] glass rounded-3xl">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Strategizing your content empire...</p>
            </div>
          )}

          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-[500px] border-2 border-dashed rounded-3xl text-center p-10 glass">
              <Calendar className="w-16 h-16 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-bold mb-2">No active plan yet</h3>
              <p className="text-muted-foreground max-w-sm">Configure your plan on the left to see your strategic calendar here.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-xl font-bold">{formData.planDuration} Content Strategy</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Download className="mr-2 w-4 h-4" /> Export PDF
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <TableIcon className="mr-2 w-4 h-4" /> Export CSV
                  </Button>
                </div>
              </div>

              <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-bold">Day</TableHead>
                      <TableHead className="font-bold">Topic</TableHead>
                      <TableHead className="font-bold">Platform & Format</TableHead>
                      <TableHead className="font-bold">Posting Time</TableHead>
                      <TableHead className="font-bold">CTA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.plan.map((entry, idx) => (
                      <TableRow key={idx} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-bold text-primary">{entry.day}</TableCell>
                        <TableCell className="max-w-xs">
                          <p className="font-medium text-gray-900">{entry.contentTopic}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="w-fit text-[10px] uppercase font-bold text-primary border-primary/20 bg-primary/5">
                              {entry.platform}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{entry.format}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-medium">{entry.postingTime}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{entry.cta}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}