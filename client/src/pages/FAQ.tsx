import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      id: "item-1",
      question: "Do I need any prior computer experience to take these courses?",
      answer: "Not at all! Our courses are specifically designed for complete beginners. We start with the very basics, like how to use a mouse and keyboard, before moving on to more advanced topics."
    },
    {
      id: "item-2",
      question: "What equipment do I need to get started?",
      answer: "All you need is a computer (desktop or laptop), a tablet, or a smartphone, and an internet connection. Our courses cover how to use all of these devices."
    },
    {
      id: "item-3",
      question: "Are the courses self-paced or scheduled?",
      answer: "All our courses are completely self-paced. You can start, stop, and pause whenever you like. You can also rewatch lessons as many times as you need."
    },
    {
      id: "item-4",
      question: "How do I ask for help if I get stuck?",
      answer: "We have a dedicated support team ready to help! You can reach out via the 'Contact' page, or use the community forum within each course to ask questions to both instructors and fellow students."
    },
    {
      id: "item-5",
      question: "Is my personal information safe on ElderNet?",
      answer: "Yes, absolutely. We take your privacy very seriously. We use secure encryption to protect your data and we will never sell your information to third parties. We also have a whole course dedicated to teaching you how to stay safe online!"
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <h1 className="text-[42px] font-bold text-secondary mb-[40px] text-center">
        FREQUENTLY ASKED QUESTIONS
      </h1>

      <div className="max-w-[800px] mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-[16px]">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-none bg-muted rounded-[8px] overflow-hidden">
              <AccordionTrigger className="px-[20px] py-[20px] text-[20px] font-bold text-secondary hover:no-underline hover:bg-muted/80 transition-colors [&[data-state=open]]:bg-muted/80">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-[20px] pb-[20px] pt-0 text-[18px] leading-[1.6] text-secondary/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
