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
        // 🔒 CRITICAL WIDTH CONTROL
        "w-full max-w-full min-w-0 overflow-hidden",

        // Layout
        "flex flex-col items-center justify-center",
        "p-3 sm:p-4 rounded-xl border-2 transition-all duration-200",

        // Effects
        "hover:shadow-hover hover:-translate-y-0.5",

        categoryStyles[category],
        isSelected && "ring-2 ring-primary ring-offset-1"
      )}
    >
      {/* Icon */}
      <span className="text-2xl sm:text-3xl mb-1 sm:mb-2 shrink-0">
        {info.icon}
      </span>

      {/* Text container */}
      <div className="min-w-0 text-center">
        <h3 className="font-display font-semibold text-sm sm:text-base truncate">
          {info.label}
        </h3>
        <p className="text-xs sm:text-sm opacity-70 truncate">
          {info.description}
        </p>
      </div>
    </button>
  );
}
