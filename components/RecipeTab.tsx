import { useState } from 'react';
import { Sparkles, Loader2, ChefHat, ShoppingCart, AlertCircle } from 'lucide-react';
import { RecipeModal } from './RecipeModal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FoodItem, ShoppingItem, Recipe } from '@/data/food-types';
import { sampleRecipes } from '@/data/recipes';
import { RecipeCard } from './cards/RecipeCard';

interface RecipesTabProps {
  onAddItem: (item: FoodItem, quantity: number) => void;
  shoppingListItems?: ShoppingItem[];
}

interface GeneratedRecipe {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  tips?: string;
}

export function RecipesTab({ onAddItem, shoppingListItems = [] }: RecipesTabProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<GeneratedRecipe | null>(null);
  const [showGenerated, setShowGenerated] = useState(false);

  const handleAddAllIngredients = () => {
    if (!selectedRecipe) return;
    selectedRecipe.ingredients.forEach(ing => {
      onAddItem(ing.item, ing.amount);
    });
  };

  const handleGenerateRecipe = async () => {
    if (shoppingListItems.length === 0) {
      toast.error("Add items to your shopping list first", {
        description: "I'll create a recipe using those ingredients"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedRecipe(null);

    try {
      const ingredients = shoppingListItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
      }));

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-recipe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ ingredients }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate recipe');
      }

      setGeneratedRecipe(data.recipe);
      setShowGenerated(true);
      
      toast.success("Recipe generated!", {
        description: data.recipe.title
      });
    } catch (error) {
      console.error('Recipe generation error:', error);
      toast.error("Failed to generate recipe", {
        description: error instanceof Error ? error.message : "Please try again"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in px-4">
      {/* AI Recipe Generation Section */}
      <div className="bg-linear-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold text-foreground mb-1">
              AI Recipe Generator
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Generate a custom recipe using the ingredients in your shopping list
            </p>
            
            {shoppingListItems.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                <AlertCircle className="h-4 w-4" />
                <span>Add items to your shopping list to generate recipes</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {shoppingListItems.slice(0, 6).map(item => (
                    <span
                      key={item.id}
                      className="px-2 py-1 bg-background rounded-md text-xs text-foreground border border-border"
                    >
                      {item.name}
                    </span>
                  ))}
                  {shoppingListItems.length > 6 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{shoppingListItems.length - 6} more
                    </span>
                  )}
                </div>
                <Button
                  onClick={handleGenerateRecipe}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Recipe
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generated Recipe Display */}
      {showGenerated && generatedRecipe && (
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ChefHat className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {generatedRecipe.title}
                </h3>
                <p className="text-sm text-muted-foreground">AI Generated Recipe</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGenerated(false)}
            >
              Hide
            </Button>
          </div>
          
          <p className="text-muted-foreground mb-4">{generatedRecipe.description}</p>
          
          <div className="flex gap-4 text-sm text-muted-foreground mb-4">
            <span>⏱️ Prep: {generatedRecipe.prepTime} min</span>
            <span>🍳 Cook: {generatedRecipe.cookTime} min</span>
            <span>👥 Serves: {generatedRecipe.servings}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Ingredients</h4>
              <ul className="space-y-1">
                {generatedRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {ing.amount} {ing.name}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Instructions</h4>
              <ol className="space-y-2">
                {generatedRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                    <span className="font-medium text-primary">{idx + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {generatedRecipe.tips && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">💡 Tip:</span> {generatedRecipe.tips}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recipe Collection Header */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Recipe Collection
        </h2>
        <p className="text-muted-foreground">
          Discover delicious recipes and add ingredients to your list
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
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
