"use client";

import { ShoppingCart, Trash2, CheckCheck } from 'lucide-react';
import { ShoppingListItem } from './ShoppingListItem';
import { Button } from '@/components/ui/button';
import { categoryInfo } from '@/data/food-data';
import { ShoppingItem, FoodCategory } from '@/data/food-types';

interface ShoppingListTabProps {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onClearChecked: () => void;
  onClearAll: () => void;
}

export function ShoppingListTab({
  items,
  onToggle,
  onUpdateQuantity,
  onRemove,
  onClearChecked,
  onClearAll,
}: ShoppingListTabProps) {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<FoodCategory, ShoppingItem[]>);

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in max-w-6xl mx-auto px-4 pb-10">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          Your list is empty
        </h3>
        <p className="text-muted-foreground max-w-xs">
          Browse foods or recipes to add items to your shopping list
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto px-4 pb-10 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Shopping List
          </h2>
          <p className="text-muted-foreground">
            {checkedCount} of {totalCount} items checked
          </p>
        </div>
        <div className="flex gap-2">
          {checkedCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearChecked}
              className="gap-1.5"
            >
              <CheckCheck className="h-4 w-4" />
              Clear Checked
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="gap-1.5 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {(Object.entries(groupedItems) as [FoodCategory, ShoppingItem[]][]).map(
          ([category, categoryItems]) => (
            <section key={category}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{categoryInfo[category].icon}</span>
                <h3 className="font-medium text-foreground">
                  {categoryInfo[category].label}
                </h3>
                <span className="text-sm text-muted-foreground">
                  ({categoryItems.length})
                </span>
              </div>
              <div className="space-y-2">
                {categoryItems.map(item => (
                  <ShoppingListItem
                    key={item.id}
                    item={item}
                    onToggle={() => onToggle(item.id)}
                    onUpdateQuantity={q => onUpdateQuantity(item.id, q)}
                    onRemove={() => onRemove(item.id)}
                  />
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}
