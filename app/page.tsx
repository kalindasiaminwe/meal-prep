"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { BrowseTab } from '@/components/BrowseTab';
import { ShoppingListTab } from '@/components/ShoppingListTab';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useMealPlanner } from '@/hooks/useMealPlanner';
import { RecipesTab } from '@/components/RecipeTab';
import { FoodItem, Recipe } from '@/data/food-types';
import { MealPlannerTab } from '@/components/MealPlannerTab';

type Tab = 'browse' | 'recipes' | 'planner' | 'list';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('browse');
  const {
    items,
    addItem,
    removeItem,
    toggleChecked,
    updateQuantity,
    clearChecked,
    clearAll,
  } = useShoppingList();

  const {
    mealPlan,
    addMeal,
    removeMeal,
    clearWeek,
  } = useMealPlanner();

  const handleAddItem = (item: FoodItem, quantity: number = 1) => {
    addItem(item, quantity);
    toast.success(`Added ${item.name} to your list`, {
      description: `${quantity} ${item.unit}`,
    });
  };

  const handleAddAllRecipeIngredients = (recipes: Recipe[]) => {
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        addItem(ing.item, ing.amount);
      });
    });
    toast.success(`Added ingredients from ${recipes.length} recipes to your list`);
  };

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto overflow-x-hidden">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={items.length}
      />

      <main className="container py-8">
        {activeTab === 'browse' && (
          <BrowseTab onAddItem={handleAddItem} />
        )}

        {activeTab === 'recipes' && (
          <RecipesTab onAddItem={handleAddItem} shoppingListItems={items} />
        )}

        {activeTab === 'planner' && (
          <MealPlannerTab
            mealPlan={mealPlan}
            onAddMeal={addMeal}
            onRemoveMeal={removeMeal}
            onClearWeek={clearWeek}
            onAddAllIngredients={handleAddAllRecipeIngredients}
          />
        )}


        {activeTab === 'list' && (
          <ShoppingListTab
            items={items}
            onToggle={toggleChecked}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
            onClearChecked={clearChecked}
            onClearAll={clearAll}
          />
        )}
      </main>
    </div>
  );
};

export default Index;


