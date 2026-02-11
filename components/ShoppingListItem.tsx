"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingItem } from "@/data/food-types";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggle: () => void;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function ShoppingListItem({
  item,
  onToggle,
  onUpdateQuantity,
  onRemove,
}: ShoppingListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 bg-card rounded-lg shadow-card transition-all duration-200",
        item.checked && "opacity-60"
      )}
    >
      <Checkbox
        checked={item.checked}
        onCheckedChange={onToggle}
        className="h-5 w-5"
      />

      <div className="flex-1 min-w-0">
        <h4
          className={cn(
            "font-medium transition-all",
            item.checked && "line-through text-muted-foreground"
          )}
        >
          {item.name}
        </h4>
        <p className="text-sm text-muted-foreground">{item.unit}</p>
      </div>

      {/* <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          className="h-8 w-8 rounded-full"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>

        <Button
          size="icon"
          variant="outline"
          onClick={() => onUpdateQuantity(item.quantity + 1)}
          className="h-8 w-8 rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div> */}

      <Button
        size="icon"
        variant="ghost"
        onClick={onRemove}
        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
