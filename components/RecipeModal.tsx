import { Clock, Users, Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categoryInfo } from '@/data/food-data';
import { Recipe, FoodItem } from '@/data/food-types';

interface RecipeModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  onAddIngredient: (item: FoodItem, quantity: number) => void;
  onAddAllIngredients: () => void;
}

export function RecipeModal({
  recipe,
  open,
  onClose,
  onAddIngredient,
  onAddAllIngredients,
}: RecipeModalProps) {
  if (!recipe) return null;

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <div className="aspect-2/1 bg-muted relative">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
              <span className="text-8xl">
                {recipe.categories.map(cat => categoryInfo[cat].icon).join('')}
              </span>
            </div>
          )}
          <Button
            size="icon"
            variant="secondary"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="max-h-[50vh]">
          <div className="p-6">
            <DialogHeader className="mb-4">
              <div className="flex gap-2 mb-2">
                {recipe.categories.map(cat => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {categoryInfo[cat].label}
                  </span>
                ))}
              </div>
              <DialogTitle className="font-display text-2xl">
                {recipe.title}
              </DialogTitle>
            </DialogHeader>

            <p className="text-muted-foreground mb-4">{recipe.description}</p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Prep: {recipe.prepTime}min</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Cook: {recipe.cookTime}min</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display font-semibold text-lg">Ingredients</h4>
                <Button
                  size="sm"
                  onClick={onAddAllIngredients}
                  className="gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  Add All to List
                </Button>
              </div>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span>
                      {ing.amount} {ing.item.unit} {ing.item.name}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onAddIngredient(ing.item, ing.amount)}
                      className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-3">Instructions</h4>
              <ol className="space-y-3">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
