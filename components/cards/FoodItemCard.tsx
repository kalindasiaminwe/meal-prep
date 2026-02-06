"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FoodItem, FoodCategory } from "@/data/food-types";
import { useState } from "react";

interface FoodItemCardProps {
  item: FoodItem;
  onAdd?: (item: FoodItem, quantity: number) => void;
}

const categoryAccents: Record<FoodCategory, string> = {
  protein: "border-l-protein",
  carbs: "border-l-carbs",
  vegetables: "border-l-vegetables",
  dairy: "border-l-dairy",
  fruits: "border-l-fruits",
  fats: "border-l-fats",
};

export function FoodItemCard({ item, onAdd }: FoodItemCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (onAdd) onAdd(item, quantity);
    setQuantity(1);
  };

  return (
    <div
      className={cn(
        // 🔒 WIDTH SAFETY
        "w-full max-w-full min-w-0 overflow-hidden",

        // Layout
        "flex items-center gap-3",
        "p-3 sm:p-4 bg-card rounded-lg border-l-4",

        // Effects
        "shadow-card hover:shadow-soft transition-shadow duration-200",

        categoryAccents[item.category]
      )}
    >
      {/* Text */}
      <div className="min-w-0 flex-1">
        <h4 className="font-medium text-sm sm:text-base truncate">
          {item.name}
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">
          per {item.unit}
        </p>
      </div>

      {/* Action */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleAdd}
        className="shrink-0 px-2 sm:px-3"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Add</span>
      </Button>
    </div>
  );
}
