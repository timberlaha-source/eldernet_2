/// <reference types="react" />

import directorImg from '@/assets/images/Directors image.png';
import team2Img from '@/assets/images/team-2.jpg';
import team4Img from '@/assets/images/team - 4.jpeg';
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 text-secondary">
      <h1 className="text-[42px] font-bold mb-[32px]">
        WHO WE ARE
      </h1>

      {/* Vision & Mission */}
      <section className="flex flex-col md:flex-row gap-[40px] mb-24">
        <div className="flex-1">
          <h2 className="text-[28px] font-semibold mb-4">VISION</h2>
          <p className="text-[19px] leading-[1.6] opacity-80">
            To create a world where no older adult is left behind by the rapid pace of technological advancement, fostering independence and connection.
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-[28px] font-semibold mb-4">MISSION</h2>
          <p className="text-[19px] leading-[1.6] opacity-80">
            To provide accessible, patient, and comprehensive digital education to seniors, empowering them to navigate the internet, stay connected with loved ones, and access essential online services safely.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="flex flex-col md:flex-row items-center gap-[60px] mb-24">
        <div className="shrink-0">
          <img 
            src={directorImg} 
            alt="Director" 
            className="w-[350px] h-[350px] object-cover rounded-full shadow-xl border-4 border-white"
          />
        </div>
        <div className="flex-1 max-w-[600px]">
          <h3 className="text-[30px] font-bold mb-4">Sudakshina Laha and Pallavi Sharma</h3>
          <p className="text-primary font-bold text-xl mb-4 italic">Founder & Director</p>
          <p className="text-[19px] leading-[1.6] opacity-80">
            Sudakshina Laha and Pallavi Sharma started ElderNet after noticing elderly individuals struggling with basic digital tasks during the pandemic. Recognizing the isolation this caused, they dedicated themselves to building a platform that breaks down technological barriers for the older generation, ensuring everyone has the tools to stay connected in the digital age.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-24">
        <h2 className="text-[32px] font-bold mb-12 text-center underline decoration-primary decoration-4 underline-offset-8">Our Team</h2>
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-[20px] shadow-lg transition-transform group-hover:scale-105 duration-300">
            <img src={team4Img} alt="Team Member" className="w-[400px] h-[400px] object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white/50 p-12 rounded-[30px] border border-border/40 shadow-inner">
        <h2 className="text-[32px] font-bold mb-12 text-center">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white border-none shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <p className="text-[18px] italic opacity-80 mb-6 leading-relaxed">
                "Thanks to ElderNet, I can now video call my grandchildren every weekend without waiting for my son to set it up for me."
              </p>
              <p className="font-bold text-primary">— Martha, 78</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <p className="text-[18px] italic opacity-80 mb-6 leading-relaxed">
                "The online safety course gave me the confidence to finally start banking online. I feel much more secure now."
              </p>
              <p className="font-bold text-primary">— Robert, 82</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <p className="text-[18px] italic opacity-80 mb-6 leading-relaxed">
                "The instructors are incredibly patient. I never felt rushed or silly for asking questions. Highly recommend!"
              </p>
              <p className="font-bold text-primary">— Linda, 71</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
