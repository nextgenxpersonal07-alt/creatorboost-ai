import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'CreatorBoost AI - YouTube Title, Caption & Hashtag Generator',
  description:
    'Free AI tools for YouTube and Instagram creators. Generate titles, captions, hashtags, scripts, thumbnail ideas and content plans instantly.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="i-JprjrYos97SYakX0mU38D7foE9izCn0ODnPLLUtK8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#F7F8FF]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
