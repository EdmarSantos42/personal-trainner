"use client";

import { useState } from "react";
import {
  ScrollProgress,
  Navbar,
  Hero,
  StatsBar,
  Quiz,
  Services,
  About,
  Testimonials,
  HowItWorks,
  Pricing,
  FAQ,
  FinalCTA,
  Footer,
} from "@/components/landing";
import { ChatWidget } from "@/components/chat";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function LandingPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [chosenPlan, setChosenPlan] = useState<string | null>(null);

  const choosePlan = (plan: string) => {
    setChosenPlan(plan);
    setChatOpen(true);
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero onQuiz={() => scrollTo("quiz")} onResults={() => scrollTo("resultados")} />
      <StatsBar />
      <Quiz
        onComplete={(_answers, recommendation) => setQuizResult(recommendation)}
        onCTAClick={() => setChatOpen(true)}
      />
      <Services />
      <About />
      <Testimonials />
      <HowItWorks onQuizClick={() => scrollTo("quiz")} />
      <Pricing onChoosePlan={choosePlan} />
      <FAQ />
      <FinalCTA onQuizClick={() => scrollTo("quiz")} onChatClick={() => setChatOpen(true)} />
      <Footer />
      <ChatWidget
        open={chatOpen}
        onOpenChange={setChatOpen}
        quizResult={quizResult}
        chosenPlan={chosenPlan}
      />
    </>
  );
}
