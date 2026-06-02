import { Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const reviews = [
  {
    name: "Alex Rivera",
    role: "YouTube Tech Reviewer",
    content: "CreatorBoost AI saved me 10 hours a week on scriptwriting alone. My CTR jumped from 4% to 9% using the Title Generator!",
    stars: 5,
    avatar: PlaceHolderImages.find(img => img.id === "user-avatar-1")?.imageUrl,
  },
  {
    name: "Sarah Chen",
    role: "Instagram Lifestyle Influencer",
    content: "The Caption and Hashtag generators are literal magic. I don't spend hours thinking about what to write anymore.",
    stars: 5,
    avatar: PlaceHolderImages.find(img => img.id === "user-avatar-2")?.imageUrl,
  },
  {
    name: "James Wilson",
    role: "Digital Marketing Consultant",
    content: "I use the Content Planner for all my clients. It's the most strategic tool I've ever found for social media growth.",
    stars: 5,
    avatar: PlaceHolderImages.find(img => img.id === "user-avatar-3")?.imageUrl,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#F7F8FF]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl font-bold mb-4">
          Loved by <span className="gradient-text">Top Creators</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg">
          Join thousands of influencers who are scaling their reach with AI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border shadow-sm text-left">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(review.stars)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-lg italic mb-8">"{review.content}"</p>
              <div className="flex items-center gap-4">
                {review.avatar && (
                  <Image 
                    src={review.avatar} 
                    width={50} 
                    height={50} 
                    alt={review.name} 
                    className="rounded-full ring-2 ring-primary/10" 
                  />
                )}
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}