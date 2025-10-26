// src/components/RecommendationList.tsx
import React from "react"; // Import React for ElementType
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tractor, Wheat, Package } from "lucide-react"; // Import Spray icon
import type { DemoMachine } from "@/lib/demoData"; // Import the type

// Updated map to get the correct icon component
// Use React.ElementType for the component type
const iconMap: Record<string, React.ElementType> = {
  Tractor: Tractor,
  Wheat: Wheat,
  Package: Package,// Added mapping for Spray
  // Add more mappings here if you add more icon strings in demoData.ts
};

interface RecommendationListProps {
  recommendations: DemoMachine[];
}

export const RecommendationList = ({
  recommendations,
}: RecommendationListProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="px-4 space-y-3 pb-4">
      <h2 className="text-lg font-semibold">{t("home.recommendTitle") /* Use recommendation title */}</h2>
      {/* Handle case where recommendations might be empty after search */}
      {recommendations.length === 0 ? (
         <p className="text-muted-foreground text-center py-4">{t("error.noMatch")}</p>
      ) : (
        recommendations.map((machine) => {
          // Dynamically get the Icon component, fallback to Tractor
          const Icon: React.ElementType = iconMap[machine.icon] || Tractor;
          return (
            <Card
              key={machine.id}
              className="p-4 rounded-2xl card-shadow animate-in fade-in-50" // Added animation class
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {/* Render the Icon component */}
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{machine.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {machine.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-semibold text-primary">
                      ₹{machine.price}/{t("common.hr")}
                    </span>
                    <Button
                      size="sm"
                      className="gradient-primary"
                      // Navigate to a generic machine page for demo
                      // Ideally, you might want a way to link demo IDs to real ones later
                      onClick={() => navigate(`/machine/1`)}
                    >
                      {t("home.bookNow")}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};