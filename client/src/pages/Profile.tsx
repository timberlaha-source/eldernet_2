import { useState, useEffect } from "react";
// Fixed these from @/ to ../
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { LogIn, UserPlus, Chrome, User, LogOut, Coins } from "lucide-react";
import { useToast } from "../hooks/use-toast"; // Fixed path to hooks

// Fixed these from @/ to ../
import {
  auth,
  db,
} from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export default function Profile() {
  const [isLogin, setIsLogin] = useState(true);
  // hold firebase user object
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [points, setPoints] = useState(0);
  const [coursesStarted, setCoursesStarted] = useState(0);
  const [lessonsFinished, setLessonsFinished] = useState(0);
  const { toast } = useToast();

  // on mount we start observing auth state. firebase will keep the session in
  // local storage/cookies automatically so the user remains logged in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // load user data from Firestore
        const userDocRef = doc(db, "users", u.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPoints(data.points || 0);
          setCoursesStarted(data.coursesStarted || 0);
          setLessonsFinished(data.lessonsFinished || 0);
        } else {
          // initialize new user data
          await setDoc(userDocRef, {
            points: 0,
            coursesStarted: 0,
            lessonsFinished: 0,
            email: u.email,
            displayName: u.displayName,
          });
        }
      } else {
        // reset local state
        setPoints(0);
        setCoursesStarted(0);
        setLessonsFinished(0);
      }
    });

    return () => unsubscribe();
  }, []);

  // helper to show toast on error
  function showError(err: unknown) {
    console.error(err);
    toast({
      title: "Authentication error",
      description: (err as Error).message,
      variant: "destructive",
    });
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Signed in", description: `Welcome back, ${email}!` });
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // if the user supplied a name field, update the profile
        const nameField = formData.get("name") as string;
        if (nameField && result.user) {
          await updateProfile(result.user, { displayName: nameField });
        }
        // initialize user data in Firestore
        const userDocRef = doc(db, "users", result.user.uid);
        await setDoc(userDocRef, {
          points: 0,
          coursesStarted: 0,
          lessonsFinished: 0,
          email: result.user.email,
          displayName: nameField || result.user.email?.split("@")[0],
        });
        toast({ title: "Account created", description: `Welcome, ${email}!` });
      }
    } catch (err) {
      showError(err);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Google sign in successful" });
    } catch (err) {
      showError(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Signed out", description: "You have been successfully signed out." });
    } catch (err) {
      showError(err);
    }
  };

  if (user) {
    const displayName =
      user.displayName || user.email?.split("@")[0] || "Unknown User";
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
                <h2 className="text-3xl font-bold text-secondary">{displayName}</h2>
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
                <p className="text-2xl font-bold text-secondary">{coursesStarted}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-border">
                <p className="text-sm font-bold text-secondary/40 uppercase">Lessons Finished</p>
                <p className="text-2xl font-bold text-secondary">{lessonsFinished}</p>
              </div>
            </div>

            <Button onClick={async () => {
              if (!user) return;
              const newPoints = points + 10;
              setPoints(newPoints);
              const userDocRef = doc(db, "users", user.uid);
              await updateDoc(userDocRef, { points: newPoints });
              toast({ title: "Points updated", description: "Earned 10 points!" });
            }} variant="outline" className="w-full h-[60px] border-primary text-primary hover:bg-primary/5 text-lg font-bold rounded-[12px] flex items-center justify-center gap-2">
              <Coins className="w-5 h-5" /> EARN 10 POINTS (DEMO)
            </Button>

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
