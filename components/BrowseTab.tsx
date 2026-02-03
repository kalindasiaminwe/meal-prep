import { useState } from 'react';

import { foodItems, categoryInfo } from '@/data/food-data';
import { FoodItem, FoodCategory } from '@/data/food-types';
import { CategoryCard } from './cards/CategoryCard';
import { FoodItemCard } from './cards/FoodItemCard';

interface BrowseTabProps {
  onAddItem: (item: FoodItem) => void;
}

const categories: FoodCategory[] = ['protein', 'carbs', 'vegetables', 'dairy', 'fruits', 'fats'];

export function BrowseTab({ onAddItem }: BrowseTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(null);

  const filteredItems = selectedCategory
    ? foodItems.filter(item => item.category === selectedCategory)
    : [];

  return (
    <div className="space-y-8 animate-fade-in">
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Food Categories
        </h2>
        <p className="text-muted-foreground mb-6">
          Select a category to browse ingredients
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <CategoryCard
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category
              )}
            />
          ))}
        </div>
      </section>

      {selectedCategory && (
        <section className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{categoryInfo[selectedCategory].icon}</span>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {categoryInfo[selectedCategory].label}
            </h2>
          </div>
          
          <div className="grid gap-3">
            {filteredItems.map(item => (
              <FoodItemCard
                key={item.id}
                item={item}
                onAdd={() => onAddItem(item)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
