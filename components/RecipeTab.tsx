'use client';

import { useState } from 'react';
import { FoodItem, Recipe } from '@/data/food-types';
import { sampleRecipes } from '@/data/recipes';
import { RecipeCard } from './cards/RecipeCard';
import { RecipeModal } from './RecipeModal';
import { Button } from '@/components/ui/button';
import { AIRecipeGenerator } from './AIRecipeGenerator';
import { ShoppingItem } from '@/data/food-types';

interface RecipesTabProps {
  onAddItem: (item: FoodItem, quantity: number) => void;
  shoppingItems?: ShoppingItem[];
}

export function RecipesTab({ onAddItem, shoppingItems = [] }: RecipesTabProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [aiRecipes, setAiRecipes] = useState<Recipe[]>([]);

  const handleAddAllIngredients = () => {
    if (!selectedRecipe) return;
    selectedRecipe.ingredients.forEach(ing => {
      onAddItem(ing.item, ing.amount);
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto px-4 pb-10 flex flex-col">

      {/* AI Recipe Generator */}
      <AIRecipeGenerator
        shoppingItems={shoppingItems}
        onGenerated={(recipes) => {
          setAiRecipes(recipes);
          if (recipes.length > 0) {
            setSelectedRecipe({
              id: 'ai-generated',
              ...recipes[0],
            });
          }
        }}
      />

      {/* AI Generated Recipes */}
      {aiRecipes.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-display text-xl font-semibold mb-2">
            AI Generated Recipes
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-3">
            {aiRecipes.map((recipe, idx) => (
              <RecipeCard
                key={`ai-${idx}`}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => {
              const blob = new Blob([JSON.stringify(aiRecipes, null, 2)], {
                type: 'application/json',
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'ai-recipes.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            ⬇ Download Recipes
          </Button>
        </div>
      )}

      {/* Sample Recipe Collection */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Recipe Collection
        </h2>
        <p className="text-muted-foreground">
          Discover delicious recipes and add ingredients to your list.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {sampleRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
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
