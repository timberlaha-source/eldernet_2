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

const generateQuizzes = (topic: string, lessonId: string): Quiz[] => {
  const questionTemplates = [
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
    },
    {
      question: `What should you do if you receive a suspicious message about ${topic}?`,
      options: ["Click on all links immediately", "Delete it and report to authorities", "Forward it to all your contacts", "Ignore it and hope it goes away"],
      correctAnswer: 1
    },
    {
      question: `How can ${topic} improve your daily life?`,
      options: ["By making everything more complicated", "By providing easy access to information and communication", "By requiring you to buy expensive equipment", "By limiting your social interactions"],
      correctAnswer: 1
    },
    {
      question: `What is a common mistake people make with ${topic}?`,
      options: ["Using it too safely", "Sharing personal information carelessly", "Updating software too frequently", "Learning new features"],
      correctAnswer: 1
    },
    {
      question: `How does ${topic} protect your privacy?`,
      options: ["It doesn't protect privacy at all", "Through secure connections and careful sharing", "By storing all your data publicly", "By requiring no passwords"],
      correctAnswer: 1
    },
    {
      question: `What resources are available for learning more about ${topic}?`,
      options: ["Only paid courses", "Free online tutorials and ElderNet courses", "Secret underground meetings", "Only through word of mouth"],
      correctAnswer: 1
    }
  ];

  const seed = lessonId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const shuffled = [...questionTemplates].sort((a, b) => {
    const hashA = (a.question.length + seed) % 10;
    const hashB = (b.question.length + seed) % 10;
    return hashA - hashB;
  });

  return shuffled.slice(0, 5);
};

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
          id: "1-1",
          title: "What is the Internet?",
          duration: "5:30",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/AYdF7b3nM-Q",
          quizzes: generateQuizzes("the Internet", "1-1")
        },
        {
          id: "1-2",
          title: "How does the Internet Work?",
          duration: "8:15",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/TNQsmPf24go",
          quizzes: generateQuizzes("Internet connections", "1-2")
        },
        {
          id: "1-3",
          title: "Using a Web Browser",
          duration: "10:00",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/o4MwTvtyrUQ",
          quizzes: generateQuizzes("Web Browsers", "1-3")
        }
      ]
    },
    {
      id: 2,
      category: "Communication",
      title: "Email Basics & Communication",
      description: "Set up an email account, send messages, and learn how to attach photos.",
      progress: 45,
      lessons: [
        {
          id: "2-1",
          title: "Setting up Gmail",
          duration: "11:35",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/CtRgwJaW2N4",
          quizzes: generateQuizzes("Gmail", "2-1")
        },
        {
          id: "2-2",
          title: "Sending your first email",
          duration: "1:16",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/BmKLfvNILNc",
          quizzes: generateQuizzes("Emailing", "2-2")
        },
        {
          id: "2-3",
          title: "Managing your inbox",
          duration: "8:22",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/oLdHnWLbn4A",
          quizzes: generateQuizzes("Inbox management", "2-3")
        }
      ]
    },
    {
      id: 3,
      category: "Safety",
      title: "Online Safety & Scam Prevention",
      description: "Essential knowledge on identifying phishing, strong passwords, and secure browsing.",
      progress: 0,
      lessons: [
        {
          id: "3-1",
          title: "Spotting Phishing Scams",
          duration: "2:06",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/iHetr8xTWIU",
          quizzes: generateQuizzes("Phishing", "3-1")
        },
        {
          id: "3-2",
          title: "Creating Strong Passwords",
          duration: "3:30",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/aEmF3Iylvr4",
          quizzes: generateQuizzes("Passwords", "3-2")
        },
        {
          id: "3-3",
          title: "Safe Online Shopping",
          duration: "1:40",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/ye5owBey3Y8",
          quizzes: generateQuizzes("Safe shopping", "3-3")
        }
      ]
    }
  ];

  // (rest of the original component continues exactly as you provided)
}
