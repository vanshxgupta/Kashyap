// src/components/FAQList.tsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { HelpCircle, Bot } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answerKey: string;
}

// Expanded list of demo questions
const demoFAQs: FAQItem[] = [
  {
    id: "faq1",
    question: "5 एकड़ जमीन के लिए कितने harvester लगेंगे?",
    answerKey: "faq.answer.harvest",
  },
  {
    id: "faq2",
    question: "mujhe seeding krni hai wheat ki tooh konsi machine chahiye?",
    answerKey: "faq.answer.sowing",
  },
  {
    id: "faq3",
    question: "paddy field ploughing machine?",
    answerKey: "faq.answer.plough",
  },
  {
    id: "faq4",
    question: "फसल पर स्प्रे करने के लिए क्या मिलेगा?",
    answerKey: "faq.answer.spray",
  },
  { // Keep existing ones
    id: "faq5",
    question: "Need machine for tillage 10 acre farm",
    answerKey: "faq.answer.tillage",
  },
  { // NEW
    id: "faq6",
    question: "Gehu ki ghai ke liye machine?", // Machine for wheat threshing?
    answerKey: "faq.answer.threshing",
  },
   { // NEW
    id: "faq7",
    question: "weed removal machine for soyabean field",
    answerKey: "faq.answer.weeding",
  },
  { // NEW
    id: "faq8",
    question: "धान काटने और बांधने वाली मशीन?", // Machine to cut and bind paddy?
    answerKey: "faq.answer.reaper",
  },
];

export const FAQList = () => {
  const { t } = useLanguage();

  return (
    <Card className="p-4 m-4 rounded-2xl card-shadow">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <HelpCircle className="h-5 w-5 text-primary" />
         {t("home.faqTitle")}
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {demoFAQs.map((faq) => (
          <AccordionItem value={faq.id} key={faq.id}>
            <AccordionTrigger className="text-left text-sm font-medium">
               {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pt-1">
               <div className="flex items-start gap-2">
                  <Bot className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t(faq.answerKey)}</span>
               </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};