"use client";

import { Button } from "@/components/ui/button";
import { Recipe } from "@/data/food-types";
import { DayOfWeek, MealType } from "@/hooks/useMealPlanner";
import { useMealPlanPDF } from "@/hooks/useMealPlannerDownloaded";

interface Props {
  days: { key: DayOfWeek; label: string }[];
  mealTypes: { key: MealType; label: string }[];
  plannedRecipes: Recipe[];
  getMeal: (day: DayOfWeek, mealType: MealType) => Recipe | null;
  totalMeals: number;
}


export function MealPlanPDFButton(props: Props) {
  const { downloadPDF } = useMealPlanPDF(props);

  return (
    <Button onClick={downloadPDF}>
      Download PDF
    </Button>
  );
}
