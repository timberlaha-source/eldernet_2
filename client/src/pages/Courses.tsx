import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  ArrowLeft,
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
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [points, setPoints] = useState(0);
  const [filter, setFilter] = useState("All");

  // ⭐ NEW subtitle language state
  const [subtitleLang, setSubtitleLang] = useState("en");

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

  const courses: Course[] = [
    {
      id: 1,
      category: "Basics",
      title: "Getting Started with the Internet",
      description: "Learn the basics of browsing and navigating websites safely.",
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
        }
      ]
    }
  ];

  const handleQuizSubmit = () => {
    const currentLesson = selectedCourse?.lessons[activeLessonIdx];
    if (!currentLesson || quizAnswer === null) return;

    if (parseInt(quizAnswer) === currentLesson.quizzes[activeQuizIdx].correctAnswer) {
      updatePoints(5);

      toast({
        title: "Correct! +5 Points",
        description: "Excellent answer!"
      });

      if (activeQuizIdx < currentLesson.quizzes.length - 1) {
        setActiveQuizIdx(activeQuizIdx + 1);
        setQuizAnswer(null);
      } else {
        setShowQuizResult(true);
      }
    }
  };

  const filteredCourses =
    filter === "All" ? courses : courses.filter(c => c.category === filter);

  if (selectedCourse) {
    const currentLesson = selectedCourse.lessons[activeLessonIdx];
    const currentQuiz = currentLesson.quizzes[activeQuizIdx];

    return (
      <div className="max-w-[1200px] mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() => {
              setSelectedCourse(null);
              setShowQuizResult(false);
              setQuizAnswer(null);
              setActiveQuizIdx(0);
            }}
            className="flex items-center gap-2 text-secondary font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Courses
          </button>

          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Coins className="w-5 h-5 text-primary" />
            <span className="font-bold">{points} Credits</span>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            {/* ⭐ Subtitle Buttons */}
            <div className="flex gap-3">
              <Button onClick={() => setSubtitleLang("en")}>
                English Subtitles
              </Button>

              <Button onClick={() => setSubtitleLang("hi")}>
                Hindi Subtitles
              </Button>
            </div>

            {/* ⭐ Video Player */}
            <div className="bg-black aspect-video rounded-xl overflow-hidden">

              <iframe
                key={subtitleLang}
                className="w-full h-full"
                src={`${currentLesson.videoUrl}?cc_load_policy=1&cc_lang_pref=${subtitleLang}&hl=${subtitleLang}`}
                title={currentLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>

            <h1 className="text-3xl font-bold">{currentLesson.title}</h1>

            {!showQuizResult && (

              <Card>
                <CardContent className="p-6 space-y-6">

                  <p className="text-xl font-medium">
                    {currentQuiz.question}
                  </p>

                  <RadioGroup
                    onValueChange={setQuizAnswer}
                    value={quizAnswer || ""}
                  >

                    {currentQuiz.options.map((option, idx) => (

                      <div key={idx} className="flex items-center space-x-3">

                        <RadioGroupItem
                          value={idx.toString()}
                          id={`opt-${idx}`}
                        />

                        <Label htmlFor={`opt-${idx}`}>
                          {option}
                        </Label>

                      </div>

                    ))}

                  </RadioGroup>

                  <Button
                    onClick={handleQuizSubmit}
                    disabled={!quizAnswer}
                    className="w-full"
                  >
                    Submit Answer
                  </Button>

                </CardContent>
              </Card>

            )}

            {showQuizResult && (

              <Card className="text-center py-10">

                <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />

                <h2 className="text-2xl font-bold">
                  Lesson Complete!
                </h2>

                <Button
                  onClick={() => {
                    setSelectedCourse(null);
                  }}
                >
                  Back to Courses
                </Button>

              </Card>

            )}

          </div>

        </div>

      </div>
    );
  }

  return (

    <div className="max-w-[1200px] mx-auto px-6 py-16">

      <h1 className="text-[42px] font-bold mb-8">
        OUR COURSES
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">

        {filteredCourses.map(course => (

          <div
            key={course.id}
            className="bg-white p-[24px] rounded-[12px] border flex flex-col"
          >

            <h2 className="text-[24px] font-bold mb-3">
              {course.title}
            </h2>

            <p className="mb-6">
              {course.description}
            </p>

            <Button
              onClick={() => {
                setSelectedCourse(course);
                setActiveLessonIdx(0);
                setActiveQuizIdx(0);
              }}
              className="w-full h-[60px]"
            >
              START LESSON
            </Button>

          </div>

        ))}

      </div>

    </div>
  );
}
