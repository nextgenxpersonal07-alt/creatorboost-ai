"use client";

import { 
  Youtube, 
  Instagram, 
  Hash, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  Zap, 
  Video, 
  Search, 
  RefreshCcw 
} from "lucide-react";

const tools = [
  {
    title: "YouTube Title Generator",
    desc: "Generate click-worthy YouTube titles that boost CTR.",
    icon: <Youtube className="w-6 h-6 text-red-500" />,
    color: "bg-red-50",
  },
  {
    title: "Instagram Caption Generator",
    desc: "Generate engaging Instagram captions that stop the scroll.",
    icon: <Instagram className="w-6 h-6 text-pink-500" />,
    color: "bg-pink-50",
  },
  {
    title: "Hashtag Generator",
    desc: "Generate trending hashtags tailored to your niche.",
    icon: <Hash className="w-6 h-6 text-blue-500" />,
    color: "bg-blue-50",
  },
  {
    title: "Script Generator",
    desc: "Generate complete video scripts with structured flow.",
    icon: <FileText className="w-6 h-6 text-purple-500" />,
    color: "bg-purple-50",
  },
  {
    title: "Thumbnail Idea Generator",
    desc: "Generate high-conversion thumbnail concepts and layouts.",
    icon: <ImageIcon className="w-6 h-6 text-orange-500" />,
    color: "bg-orange-50",
  },
  {
    title: "Content Planner",
    desc: "Generate weekly and monthly strategic content calendars.",
    icon: <Calendar className="w-6 h-6 text-green-500" />,
    color: "bg-green-50",
  },
  {
    title: "Hook Generator",
    desc: "Generate viral video hooks for maximum retention.",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    color: "bg-yellow-50",
  },
  {
    title: "Reel Idea Generator",
    desc: "Generate creative reel and shorts ideas based on trends.",
    icon: <Video className="w-6 h-6 text-indigo-500" />,
    color: "bg-indigo-50",
  },
  {
    title: "SEO Description Generator",
    desc: "Generate SEO-friendly descriptions for search visibility.",
    icon: <Search className="w-6 h-6 text-cyan-500" />,
    color: "bg-cyan-50",
  },
  {
    title: "Content Repurposer",
    desc: "Turn one video into multiple high-performing content pieces.",
    icon: <RefreshCcw className="w-6 h-6 text-teal-500" />,
    color: "bg-teal-50",
  },
];

export function Features() {
  return (
    <section id="tools" className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl font-bold mb-4">
          All-in-One <span className="gradient-text">AI Creator Toolkit</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg">
          Everything you need to grow your channel and profile faster than ever before.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <div key={idx} className="group p-8 rounded-2xl border glass hover:shadow-xl transition-all hover:-translate-y-1 text-left">
              <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">{tool.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}