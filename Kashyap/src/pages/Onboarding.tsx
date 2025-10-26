import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tractor, Clock, Users, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const slides = [
    {
      icon: Tractor,
      titleKey: "onboarding.slide1.title",
      descKey: "onboarding.slide1.desc",
    },
    {
      icon: Clock,
      titleKey: "onboarding.slide2.title",
      descKey: "onboarding.slide2.desc",
    },
    {
      icon: Users,
      titleKey: "onboarding.slide3.title",
      descKey: "onboarding.slide3.desc",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-8 ">
      <div className="w-full max-w-md space-y-12 ">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto bg-primary rounded-3xl flex items-center justify-center elevated-shadow">
            <Tractor className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{t("app.name")}</h1>
          <p className="text-muted-foreground">{t("app.tagline")}</p>
        </div>

        {/* Slides */}
        <div className="space-y-8 text-center min-h-[200px] flex flex-col items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${currentSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute"
                }`}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <slide.icon className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">{t(slide.titleKey)}</h2>
              <p className="text-muted-foreground text-lg">{t(slide.descKey)}</p>
            </div>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button
          onClick={handleNext}
          className="w-full h-12 text-lg gradient-primary hover:opacity-90 transition-opacity"
        >
          {t("onboarding.getStarted")}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
