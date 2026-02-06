import { useState } from 'react';
import { Calendar, Plus, X, ChefHat, ShoppingCart, Download } from 'lucide-react';
import { DayOfWeek, MealType } from '@/hooks/useMealPlanner';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import { Recipe } from '@/data/food-types';
import { sampleRecipes } from '@/data/recipes';
interface MealPlannerTabProps {
  mealPlan: Record<string, Recipe | null>;
  onAddMeal: (day: DayOfWeek, mealType: MealType, recipe: Recipe) => void;
  onRemoveMeal: (day: DayOfWeek, mealType: MealType) => void;
  onClearWeek: () => void;
  onAddAllIngredients: (recipes: Recipe[]) => void;
}

const days: { key: DayOfWeek; label: string; short: string }[] = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' },
];

const mealTypes: { key: MealType; label: string; icon: string }[] = [
  { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { key: 'lunch', label: 'Lunch', icon: '☀️' },
  { key: 'dinner', label: 'Dinner', icon: '🌙' },
];

export function MealPlannerTab({
  mealPlan,
  onAddMeal,
  onRemoveMeal,
  onClearWeek,
  onAddAllIngredients,
}: MealPlannerTabProps) {
  const [selectingSlot, setSelectingSlot] = useState<{ day: DayOfWeek; mealType: MealType } | null>(null);

  const getMeal = (day: DayOfWeek, mealType: MealType): Recipe | null => {
    return mealPlan[`${day}-${mealType}`] || null;
  };

  const plannedRecipes = Object.values(mealPlan).filter((r): r is Recipe => r !== null);
  const totalMeals = plannedRecipes.length;

  const handleSelectRecipe = (recipe: Recipe) => {
    if (selectingSlot) {
      onAddMeal(selectingSlot.day, selectingSlot.mealType, recipe);
      setSelectingSlot(null);
    }
  };

  const handleAddAllToList = () => {
    if (plannedRecipes.length > 0) {
      onAddAllIngredients(plannedRecipes);
    }
  };

  const handleDownload = () => {
    if (totalMeals === 0) {
      toast.error("Add some meals to your plan first");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Weekly Meal Plan', pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    yPos += 15;

    // Days and meals
    days.forEach(day => {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Day header
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(245, 245, 245);
      doc.rect(15, yPos - 5, pageWidth - 30, 10, 'F');
      doc.text(day.label, 20, yPos + 2);
      yPos += 12;

      // Meals
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      mealTypes.forEach(meal => {
        const recipe = getMeal(day.key, meal.key);
        doc.setFont('helvetica', 'bold');
        doc.text(`${meal.label}:`, 25, yPos);
        doc.setFont('helvetica', 'normal');
        
        if (recipe) {
          doc.text(`${recipe.title} (${recipe.prepTime + recipe.cookTime} min)`, 60, yPos);
        } else {
          doc.setTextColor(160, 160, 160);
          doc.text('No meal planned', 60, yPos);
          doc.setTextColor(0, 0, 0);
        }
        yPos += 7;
      });
      yPos += 5;
    });

    // Ingredients section
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    yPos += 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Shopping List', 20, yPos);
    yPos += 10;

    const allIngredients = new Map<string, { amount: number; unit: string }>();
    plannedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const key = ing.item.name;
        if (allIngredients.has(key)) {
          const existing = allIngredients.get(key)!;
          existing.amount += ing.amount;
        } else {
          allIngredients.set(key, { amount: ing.amount, unit: ing.item.unit });
        }
      });
    });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    allIngredients.forEach((value, name) => {
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`• ${value.amount} ${value.unit} ${name}`, 25, yPos);
      yPos += 6;
    });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated by PantryPal', pageWidth / 2, 290, { align: 'center' });

    // Save the PDF
    doc.save(`meal-plan-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success("Meal plan downloaded as PDF!");
  };

  return (
    <div className="space-y-6 animate-fade-in  px-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary" />
            Weekly Meal Planner
          </h2>
          <p className="text-muted-foreground">
            Plan your meals for the week ahead
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {totalMeals > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearWeek}
                className="text-muted-foreground"
              >
                Clear Week
              </Button>
              <Button
                size="sm"
                onClick={handleAddAllToList}
                className="gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add All to List
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-8 gap-2 mb-2">
            <div className="p-3" />
            {days.map(day => (
              <div
                key={day.key}
                className="p-3 text-center font-medium text-foreground bg-muted rounded-lg"
              >
                {day.label}
              </div>
            ))}
          </div>

          {/* Meal Rows */}
          {mealTypes.map(meal => (
            <div key={meal.key} className="grid grid-cols-8 gap-2 mb-2">
              <div className="p-3 flex items-center gap-2 font-medium text-muted-foreground">
                <span>{meal.icon}</span>
                {meal.label}
              </div>
              {days.map(day => {
                const recipe = getMeal(day.key, meal.key);
                return (
                  <MealSlotCard
                    key={`${day.key}-${meal.key}`}
                    recipe={recipe}
                    onAdd={() => setSelectingSlot({ day: day.key, mealType: meal.key })}
                    onRemove={() => onRemoveMeal(day.key, meal.key)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {days.map(day => (
          <div key={day.key} className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-display font-semibold text-foreground mb-3">
              {day.label}
            </h3>
            <div className="space-y-2">
              {mealTypes.map(meal => {
                const recipe = getMeal(day.key, meal.key);
                return (
                  <div
                    key={meal.key}
                    className="flex items-center gap-3"
                  >
                    <span className="w-20 text-sm text-muted-foreground flex items-center gap-2">
                      <span>{meal.icon}</span>
                      {meal.label}
                    </span>
                    <div className="flex-1">
                      <MealSlotCard
                        recipe={recipe}
                        onAdd={() => setSelectingSlot({ day: day.key, mealType: meal.key })}
                        onRemove={() => onRemoveMeal(day.key, meal.key)}
                        compact
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Selection Dialog */}
      <Dialog open={!!selectingSlot} onOpenChange={() => setSelectingSlot(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              Select a Recipe
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-2 pr-4">
              {sampleRecipes.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe)}
                  className="w-full p-3 text-left rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <p className="font-medium text-foreground">{recipe.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {recipe.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {recipe.prepTime + recipe.cookTime} min • {recipe.servings} servings
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MealSlotCardProps {
  recipe: Recipe | null;
  onAdd: () => void;
  onRemove: () => void;
  compact?: boolean;
}

function MealSlotCard({ recipe, onAdd, onRemove, compact = false }: MealSlotCardProps) {
  if (!recipe) {
    return (
      <button
        onClick={onAdd}
        className={cn(
          'w-full border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors group',
          compact ? 'h-10' : 'h-24'
        )}
      >
        <Plus className={cn('transition-transform group-hover:scale-110', compact ? 'h-4 w-4' : 'h-5 w-5')} />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'relative bg-primary/10 border border-primary/20 rounded-lg overflow-hidden group',
        compact ? 'p-2' : 'p-3 h-24'
      )}
    >
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
      >
        <X className="h-3 w-3" />
      </button>
      <p className={cn('font-medium text-foreground', compact ? 'text-sm line-clamp-1' : 'text-sm line-clamp-2')}>
        {recipe.title}
      </p>
      {!compact && (
        <p className="text-xs text-muted-foreground mt-1">
          {recipe.prepTime + recipe.cookTime} min
        </p>
      )}
    </div>
  );
}
