import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogIn, UserPlus, Chrome, User, LogOut, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [points, setPoints] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem("eldernet_user");
    const savedPoints = localStorage.getItem("eldernet_points");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedPoints) setPoints(parseInt(savedPoints));
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const name = (formData.get("name") as string) || email.split("@")[0];
    
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem("eldernet_user", JSON.stringify(userData));
    
    toast({
      title: isLogin ? "Welcome Back!" : "Account Created!",
      description: `Signed in as ${email}. Your progress will be saved to this device.`,
    });
  };

  const handleGoogleLogin = () => {
    const userData = { name: "Google User", email: "user@gmail.com" };
    setUser(userData);
    localStorage.setItem("eldernet_user", JSON.stringify(userData));
    toast({
      title: "Google Sign In Successful",
      description: "Recognized via Google. Welcome back!",
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("eldernet_user");
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  if (user) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16 flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-[600px] border-border/40 shadow-xl rounded-[20px] overflow-hidden">
          <div className="bg-secondary h-32 relative">
            <div className="absolute -bottom-12 left-8 border-4 border-white rounded-full bg-muted w-24 h-24 flex items-center justify-center">
              <User className="w-12 h-12 text-secondary" />
            </div>
          </div>
          <CardContent className="pt-16 pb-8 px-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-secondary">{user.name}</h2>
                <p className="text-secondary/60 text-lg">{user.email}</p>
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" />
                <span className="font-bold text-secondary text-xl">{points} Credits</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-xl border border-border">
                <p className="text-sm font-bold text-secondary/40 uppercase">Courses Started</p>
                <p className="text-2xl font-bold text-secondary">3</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-border">
                <p className="text-sm font-bold text-secondary/40 uppercase">Lessons Finished</p>
                <p className="text-2xl font-bold text-secondary">12</p>
              </div>
            </div>

            <Button onClick={handleLogout} variant="outline" className="w-full h-[60px] border-destructive text-destructive hover:bg-destructive/5 text-lg font-bold rounded-[12px] flex items-center justify-center gap-2">
              <LogOut className="w-5 h-5" /> SIGN OUT
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-[500px] border-border/40 shadow-lg rounded-[16px] overflow-hidden">
        <CardHeader className="bg-secondary text-white p-8">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            {isLogin ? <LogIn className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
            {isLogin ? "Welcome Back" : "Join ElderNet"}
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            {isLogin ? "Sign in to continue your journey." : "Create an account to track your progress."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" className="h-[55px] text-lg" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="email@example.com" className="h-[55px] text-lg" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="h-[55px] text-lg" required />
            </div>
            
            <Button type="submit" className="w-full h-[60px] bg-primary text-white text-[20px] font-bold rounded-[10px]">
              {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
            </Button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-secondary/40 font-bold uppercase text-sm">Or</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full h-[60px] border-2 text-secondary text-[18px] font-bold rounded-[10px] flex items-center justify-center gap-3">
              <Chrome className="w-6 h-6" /> GOOGLE SIGN IN
            </Button>
          </form>
          <div className="mt-8 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold hover:underline text-lg">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
