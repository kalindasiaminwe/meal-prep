"use client";

import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FoodItem, FoodCategory } from "@/data/food-types";
import { useState } from "react";
import { toast } from "sonner"; // using sonner for toast

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

    // Show Sonner toast
    // toast.success(`${quantity} x ${item.name} added to shopping list`, {
    //   position: "top-right",
    // });

    setQuantity(1); // reset quantity
  };

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
        <p className="text-sm text-muted-foreground">per {item.unit}</p>
      </div>

      <div className="flex items-center gap-2">
        {/* Quantity selector
        <Button
          size="icon"
          variant="outline"
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="h-8 w-8 rounded-full"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-8 text-center font-medium">{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setQuantity(q => q + 1)}
          className="h-8 w-8 rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button> */}

        {/* Add Button */}
        <Button
          variant="ghost"
          onClick={handleAdd}
          className=" rounded-full hover:bg-primary/10 hover:text-primary"
        >
          <Plus className="h-5 w-5" /> Add
        </Button>
      </div>
    </div>
  );
}
