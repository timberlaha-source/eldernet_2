import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <h1 className="text-[42px] font-bold text-secondary mb-[40px] text-center">
        CONTACT US
      </h1>

      <div className="max-w-[600px] mx-auto bg-white p-8 rounded-[12px] shadow-sm border border-border/40">
        <form className="space-y-[20px]" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[18px] font-medium text-secondary">
              Full Name
            </Label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              className="h-[55px] text-[18px] rounded-[8px] pl-[12px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[18px] font-medium text-secondary">
              Email Address
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              className="h-[55px] text-[18px] rounded-[8px] pl-[12px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-[18px] font-medium text-secondary">
              Subject
            </Label>
            <Input 
              id="subject" 
              placeholder="What is this regarding?" 
              className="h-[55px] text-[18px] rounded-[8px] pl-[12px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[18px] font-medium text-secondary">
              Message
            </Label>
            <Textarea 
              id="message" 
              placeholder="Type your message here..." 
              className="h-[150px] text-[18px] rounded-[8px] p-[12px] resize-none"
            />
          </div>

          <Button type="submit" className="w-full h-[60px] bg-primary hover:bg-primary/90 text-white text-[20px] font-bold rounded-[8px] mt-4">
            SEND MESSAGE
          </Button>
        </form>
      </div>
    </div>
  );
}
