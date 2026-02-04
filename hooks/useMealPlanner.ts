"use client";

import { Recipe } from '@/data/food-types';
import { useState, useCallback } from 'react';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type MealType = 'breakfast' | 'lunch' | 'dinner';
export interface MealSlot {
  day: DayOfWeek;
  mealType: MealType;
  recipe: Recipe | null;
}
export interface MealPlan {
  [key: string]: Recipe | null; 
}
const createEmptyMealPlan = (): MealPlan => {
  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const meals: MealType[] = ['breakfast', 'lunch', 'dinner'];
  const plan: MealPlan = {};
  
  days.forEach(day => {
    meals.forEach(meal => {
      plan[`${day}-${meal}`] = null;
    });
  });
  
  return plan;
};
export function useMealPlanner() {
  const [mealPlan, setMealPlan] = useState<MealPlan>(createEmptyMealPlan);
  const addMeal = useCallback((day: DayOfWeek, mealType: MealType, recipe: Recipe) => {
    setMealPlan(prev => ({
      ...prev,
      [`${day}-${mealType}`]: recipe,
    }));
  }, []);
  const removeMeal = useCallback((day: DayOfWeek, mealType: MealType) => {
    setMealPlan(prev => ({
      ...prev,
      [`${day}-${mealType}`]: null,
    }));
  }, []);
  const getMeal = useCallback((day: DayOfWeek, mealType: MealType): Recipe | null => {
    return mealPlan[`${day}-${mealType}`] || null;
  }, [mealPlan]);
  const clearWeek = useCallback(() => {
    setMealPlan(createEmptyMealPlan());
  }, []);
  const getPlannedRecipes = useCallback((): Recipe[] => {
    return Object.values(mealPlan).filter((recipe): recipe is Recipe => recipe !== null);
  }, [mealPlan]);
  return {
    mealPlan,
    addMeal,
    removeMeal,
    getMeal,
    clearWeek,
    getPlannedRecipes,
  };
}