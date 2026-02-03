import { FoodItem, Recipe } from '@/data/food-types';
import { sampleRecipes } from '@/data/recipes';
import { useState } from 'react';
import { RecipeCard } from './cards/RecipeCard';
import { RecipeModal } from './RecipeModal';

interface RecipesTabProps {
  onAddItem: (item: FoodItem, quantity: number) => void;
}

export function RecipesTab({ onAddItem }: RecipesTabProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleAddAllIngredients = () => {
    if (!selectedRecipe) return;
    selectedRecipe.ingredients.forEach(ing => {
      onAddItem(ing.item, ing.amount);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Recipe Collection
        </h2>
        <p className="text-muted-foreground">
          Discover delicious recipes and add ingredients to your list
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sampleRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      <RecipeModal
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAddIngredient={onAddItem}
        onAddAllIngredients={handleAddAllIngredients}
      />
    </div>
  );
}
