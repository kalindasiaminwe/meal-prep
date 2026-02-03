"use client";

import { categoryInfo } from "@/data/food-data";
import { FoodCategory } from "@/data/food-types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: FoodCategory;
  isSelected?: boolean;
  onClick?: () => void;
}

const categoryStyles: Record<FoodCategory, string> = {
  protein:
    "bg-protein-bg text-protein border-protein/20 hover:border-protein/40",
  carbs: "bg-carbs-bg text-carbs border-carbs/20 hover:border-carbs/40",
  vegetables:
    "bg-vegetables-bg text-vegetables border-vegetables/20 hover:border-vegetables/40",
  dairy: "bg-dairy-bg text-dairy border-dairy/20 hover:border-dairy/40",
  fruits: "bg-fruits-bg text-fruits border-fruits/20 hover:border-fruits/40",
  fats: "bg-fats-bg text-fats border-fats/20 hover:border-fats/40",
};

export function CategoryCard({
  category,
  isSelected,
  onClick,
}: CategoryCardProps) {
  const info = categoryInfo[category];

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300",
        "hover:shadow-hover hover:-translate-y-1",
        categoryStyles[category],
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
    >
      <span className="text-4xl mb-3">{info.icon}</span>
      <h3 className="font-display font-semibold text-lg">{info.label}</h3>
      <p className="text-sm opacity-70 mt-1 text-center">
        {info.description}
      </p>
    </button>
  );
}
