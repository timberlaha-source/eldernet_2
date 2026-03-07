import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-[40px] mt-20">
      <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">ElderNet</h3>
          <p className="text-[16px] text-white/80">
            Empowering elderly individuals with digital skills.
          </p>
          <p className="text-[16px] text-white/80 mt-4">
            © {new Date().getFullYear()} ElderNet. All rights reserved.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/"><a className="text-[16px] text-white/80 hover:text-primary transition-colors">Home</a></Link></li>
            <li><Link href="/about"><a className="text-[16px] text-white/80 hover:text-primary transition-colors">About Us</a></Link></li>
            <li><Link href="/courses"><a className="text-[16px] text-white/80 hover:text-primary transition-colors">Courses</a></Link></li>
            <li><Link href="/faq"><a className="text-[16px] text-white/80 hover:text-primary transition-colors">FAQs</a></Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
          <p className="text-[16px] text-white/80">
            Email: <a href="mailto:hello@eldernet.com" className="hover:text-primary transition-colors">hello@eldernet.com</a>
          </p>
          <p className="text-[16px] text-white/80 mt-2">
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
    </footer>
  );
}
