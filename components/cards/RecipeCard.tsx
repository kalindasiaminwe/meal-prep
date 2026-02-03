"use client";

import { categoryInfo } from '@/data/food-data';
import { Recipe } from '@/data/food-types';
import { Clock, Users } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <button
      onClick={onClick}
      className="group text-left w-full bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-4/3 bg-muted relative overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
            <span className="text-6xl">
              {recipe.categories.map(cat => categoryInfo[cat].icon).join('')}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex gap-2 mb-3">
          {recipe.categories.map(cat => (
            <span
              key={cat}
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {categoryInfo[cat].label}
            </span>
          ))}
        </div>
        
        <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {recipe.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </button>
  );
}
