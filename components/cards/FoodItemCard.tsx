"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FoodItem, FoodCategory } from "@/data/food-types";

interface FoodItemCardProps {
  item: FoodItem;
  onAdd?: () => void;
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
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-card rounded-lg border-l-4 shadow-card",
        "hover:shadow-soft transition-shadow duration-200",
        categoryAccents[item.category]
      )}
    >
      <div>
        <h4 className="font-medium text-foreground">{item.name}</h4>
        <p className="text-sm text-muted-foreground">
          per {item.unit}
        </p>
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={onAdd}
        className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
}
