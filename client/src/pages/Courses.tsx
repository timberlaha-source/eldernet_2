import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  BookOpen, 
  Play, 
  Award,
  Coins
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
  quizzes: Quiz[];
}

interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  progress: number;
  lessons: Lesson[];
}

const generateQuizzes = (topic: string): Quiz[] => [
  {
    question: `What is the most important rule about ${topic}?`,
    options: ["Ignore it completely", "Always be cautious and double check", "Share it with everyone", "Only use it at night"],
    correctAnswer: 1
  },
  {
    question: `Which of these is a key component of ${topic}?`,
    options: ["A physical hammer", "Digital awareness", "A bowl of soup", "A television remote"],
    correctAnswer: 1
  },
  {
    question: `How often should you update your knowledge of ${topic}?`,
    options: ["Never", "Once every 10 years", "Regularly, as technology changes", "Only when someone tells you to"],
    correctAnswer: 2
  },
  {
    question: `Why is ${topic} helpful for seniors?`,
    options: ["It makes them younger", "It helps them stay connected and safe", "It provides free groceries", "It fixes physical leaky faucets"],
    correctAnswer: 1
  },
  {
    question: `Who can you contact for help with ${topic}?`,
    options: ["The local bakery", "ElderNet support or a trusted family member", "A random person on the street", "The fire department"],
    correctAnswer: 1
  }
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeQuizIdx, setActiveQuizIdx] = useState(0);
  const [filter, setFilter] = useState("All");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [points, setPoints] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const savedPoints = localStorage.getItem("eldernet_points");
    if (savedPoints) setPoints(parseInt(savedPoints));
  }, []);

  const updatePoints = (newPoints: number) => {
    const total = points + newPoints;
    setPoints(total);
    localStorage.setItem("eldernet_points", total.toString());
  };

  const categories = ["All", "Basics", "Communication", "Safety"];

  const courses: Course[] = [
    {
      id: 1,
      category: "Basics",
      title: "Getting Started with the Internet",
      description: "Learn the basics of browsing, using search engines, and navigating websites safely.",
      progress: 0,
      lessons: [
        { 
          id: "1-1", title: "What is the Internet?", duration: "5:30", completed: false,
          videoUrl: "https://www.youtube.com/embed/Dxcc6ycZ73M",
          quizzes: generateQuizzes("the Internet")
        },
        { 
          id: "1-2", title: "How does the Internet Work?", duration: "8:15", completed: false,
          videoUrl: "https://www.youtube.com/embed/7_LPdttKXPc",
          quizzes: generateQuizzes("Internet connections")
        },
        { 
          id: "1-3", title: "Using a Web Browser", duration: "10:00", completed: false,
          videoUrl: "https://www.youtube.com/embed/BrXPcaRlBqo",
          quizzes: generateQuizzes("Web Browsers")
        },
      ]
    },
    {
      id: 2,
      category: "Communication",
      title: "Email Basics & Communication",
      description: "Set up an email account, send messages, and learn how to attach photos.",
      progress: 45,
      lessons: [
        { id: "2-1", title: "Setting up Gmail", duration: "7:45", completed: false, videoUrl: "https://www.youtube.com/embed/8L-70T_m5ps", quizzes: generateQuizzes("Gmail") },
        { id: "2-2", title: "Sending your first email", duration: "6:20", completed: false, videoUrl: "https://www.youtube.com/embed/2_Yv8T-v_5s", quizzes: generateQuizzes("Emailing") },
        { id: "2-3", title: "Managing your inbox", duration: "9:10", completed: false, videoUrl: "https://www.youtube.com/embed/T6fW9H-Kq_U", quizzes: generateQuizzes("Inbox management") },
      ]
    },
    {
      id: 3,
      category: "Safety",
      title: "Online Safety & Scam Prevention",
      description: "Essential knowledge on identifying phishing, strong passwords, and secure browsing.",
      progress: 0,
      lessons: [
        { id: "3-1", title: "Spotting Phishing Scams", duration: "12:30", completed: false, videoUrl: "https://www.youtube.com/embed/XBkzBrXllBA", quizzes: generateQuizzes("Phishing") },
        { id: "3-2", title: "Creating Strong Passwords", duration: "8:45", completed: false, videoUrl: "https://www.youtube.com/embed/7U-RbOKanYs", quizzes: generateQuizzes("Passwords") },
        { id: "3-3", title: "Safe Online Shopping", duration: "11:15", completed: false, videoUrl: "https://www.youtube.com/embed/6m6uP8n0v5E", quizzes: generateQuizzes("Safe shopping") },
      ]
    }
  ];

  const handleQuizSubmit = () => {
    const currentLesson = selectedCourse?.lessons[activeLessonIdx];
    if (!currentLesson?.quizzes[activeQuizIdx] || quizAnswer === null) return;

    if (parseInt(quizAnswer) === currentLesson.quizzes[activeQuizIdx].correctAnswer) {
      updatePoints(5);
      toast({
        title: "Correct! +5 Points",
        description: "Excellent answer!",
      });

      if (activeQuizIdx < currentLesson.quizzes.length - 1) {
        setActiveQuizIdx(activeQuizIdx + 1);
        setQuizAnswer(null);
      } else {
        setShowQuizResult(true);
      }
    } else {
      toast({
        title: "Not quite",
        description: "Review the video and try again.",
        variant: "destructive"
      });
    }
  };

  const filteredCourses = filter === "All" ? courses : courses.filter(c => c.category === filter);

  if (selectedCourse) {
    const currentLesson = selectedCourse.lessons[activeLessonIdx];
    const currentQuiz = currentLesson.quizzes[activeQuizIdx];

    return (
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => { setSelectedCourse(null); setShowQuizResult(false); setQuizAnswer(null); setActiveQuizIdx(0); }} className="flex items-center gap-2 text-secondary hover:text-primary font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Courses
          </button>
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            <Coins className="w-5 h-5 text-primary" />
            <span className="font-bold text-secondary">{points} Credits</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-black aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe className="w-full h-full" src={currentLesson.videoUrl} title={currentLesson.title} frameBorder="0" allowFullScreen></iframe>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-secondary">{currentLesson.title}</h1>
              
              {currentQuiz && !showQuizResult && (
                <Card className="border-2 border-primary/20">
                  <div className="bg-primary/5 p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold text-secondary">Question {activeQuizIdx + 1} of 5</h3>
                    <span className="text-sm font-bold text-primary">5 Points</span>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <p className="text-xl font-medium text-secondary">{currentQuiz.question}</p>
                    <RadioGroup onValueChange={setQuizAnswer} value={quizAnswer || ""}>
                      {currentQuiz.options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30">
                          <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} />
                          <Label htmlFor={`opt-${idx}`} className="text-lg cursor-pointer w-full">{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <Button onClick={handleQuizSubmit} disabled={!quizAnswer} className="w-full h-14 text-lg font-bold bg-primary">SUBMIT ANSWER</Button>
                  </CardContent>
                </Card>
              )}

              {showQuizResult && (
                <Card className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
                  <h2 className="text-2xl font-bold">Lesson Complete!</h2>
                  <Button onClick={() => { if (activeLessonIdx < selectedCourse.lessons.length - 1) { setActiveLessonIdx(activeLessonIdx + 1); setActiveQuizIdx(0); setShowQuizResult(false); setQuizAnswer(null); } else { setSelectedCourse(null); } }} className="bg-primary h-12 px-8">NEXT LESSON</Button>
                </Card>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6 h-fit space-y-6">
            <h3 className="text-xl font-bold">Course Lessons</h3>
            <div className="space-y-3">
              {selectedCourse.lessons.map((lesson, idx) => (
                <div key={lesson.id} onClick={() => { setActiveLessonIdx(idx); setActiveQuizIdx(0); setShowQuizResult(false); }} className={`p-4 rounded-lg border cursor-pointer ${idx === activeLessonIdx ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted"}`}>
                  <p className={`font-semibold ${idx === activeLessonIdx ? "text-primary" : ""}`}>{idx + 1}. {lesson.title}</p>
                  <p className="text-xs text-secondary/50">{lesson.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[42px] font-bold text-secondary">OUR COURSES</h1>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          <Coins className="w-5 h-5 text-primary" />
          <span className="font-bold text-secondary">{points} Credits Earned</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full text-[16px] font-bold transition-all border-2 ${filter === cat ? "bg-primary border-primary text-white" : "bg-white border-border text-secondary"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white p-[24px] rounded-[12px] shadow-sm border flex flex-col hover:shadow-md group">
            <h2 className="text-[24px] font-bold text-secondary mb-3">{course.title}</h2>
            <p className="text-[18px] text-secondary/80 mb-6 flex-grow">{course.description}</p>
            <Button onClick={() => { setSelectedCourse(course); setActiveLessonIdx(0); setActiveQuizIdx(0); }} className="w-full h-[60px] bg-primary text-white text-[20px] font-bold rounded-[8px]">START LESSON</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
