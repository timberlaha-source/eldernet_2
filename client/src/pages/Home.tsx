import heroVideoPlaceholder from '@/assets/images/hero-video-placeholder.jpg';
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-[60%]">
          <h1 className="text-[48px] font-bold text-secondary mb-[20px] leading-tight">
            WELCOME TO ELDERNET
          </h1>
          <p className="text-[20px] font-normal leading-[1.6] mb-[24px] max-w-[550px] text-secondary/80">
            Empowering elderly individuals with the digital skills and online safety knowledge they need to confidently navigate the modern world.
          </p>
          <div className="flex gap-[16px]">
            <Link href="/profile">
              <Button className="w-[220px] h-[60px] bg-primary hover:bg-primary/90 text-white text-[20px] font-bold rounded-[10px]">
                GET STARTED
              </Button>
            </Link>
            <Link href="/about">
              <Button className="w-[200px] h-[60px] bg-secondary hover:bg-secondary/90 text-white text-[20px] rounded-[10px]">
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[40%]">
          <img 
            src={heroVideoPlaceholder} 
            alt="Elderly couple learning digital skills" 
            className="w-full rounded-[12px] shadow-lg object-cover aspect-video"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row gap-[32px]">
          <div className="flex-1 bg-white p-[24px] rounded-[12px] shadow-sm border border-border/40">
            <h3 className="text-[22px] font-bold text-secondary mb-3">Beginner Friendly</h3>
            <p className="text-[18px] text-secondary/80 leading-relaxed">
              Our courses are designed specifically for those with zero prior experience. We take it one step at a time.
            </p>
          </div>
          <div className="flex-1 bg-white p-[24px] rounded-[12px] shadow-sm border border-border/40">
            <h3 className="text-[22px] font-bold text-secondary mb-3">Online Safety</h3>
            <p className="text-[18px] text-secondary/80 leading-relaxed">
              Learn how to identify scams, protect your personal information, and browse the internet securely.
            </p>
          </div>
          <div className="flex-1 bg-white p-[24px] rounded-[12px] shadow-sm border border-border/40">
            <h3 className="text-[22px] font-bold text-secondary mb-3">Community Support</h3>
            <p className="text-[18px] text-secondary/80 leading-relaxed">
              Join a supportive community of peers learning alongside you. Ask questions and share your progress.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
