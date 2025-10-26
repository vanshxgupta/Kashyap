// src/components/Loader.tsx
import { Tractor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Loader = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <Tractor className="h-16 w-16 text-primary animate-pulse" />
      <h3 className="text-lg font-semibold">{t("loader.analyzing")}</h3>
      <div className="flex gap-1.5">
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
      </div>
    </div>
  );
};