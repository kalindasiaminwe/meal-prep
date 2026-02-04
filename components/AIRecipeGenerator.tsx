'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  checked: boolean;
}

interface AIRecipeGeneratorProps {
  onGenerated: (recipes: any[]) => void;
  shoppingItems?: ShoppingItem[];
}

export function AIRecipeGenerator({ onGenerated, shoppingItems = [] }: AIRecipeGeneratorProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useShoppingList, setUseShoppingList] = useState(true);

  const generateRecipes = async () => {
    setLoading(true);

    let ingredients: string[] = [];

    if (useShoppingList) {
      // Only include checked items from the shopping list
      const checkedItems = shoppingItems.filter(item => item.checked);
      if (checkedItems.length === 0) {
        alert('No checked items in your shopping list!');
        setLoading(false);
        return;
      }

      ingredients = checkedItems.map(
        i => `${i.quantity ?? 1} ${i.unit ?? ''} ${i.name}`.trim()
      );
    } else {
      ingredients = input.split(',').map(i => i.trim()).filter(i => i.length > 0);
      if (ingredients.length === 0) {
        alert('Please enter at least one ingredient.');
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      const data = await res.json();
      onGenerated(data.recipes || []);
    } catch (err) {
      console.error('Error generating recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-dashed">
      <CardHeader>
        <h3 className="font-semibold text-lg">✨ Generate Recipes with AI</h3>
        <p className="text-sm text-muted-foreground">
          Generate up to 7 recipes using either your checked shopping list items or your own ingredients.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {/* Toggle between Shopping List / Manual Input */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={useShoppingList}
              onChange={() => setUseShoppingList(true)}
            />
            Use Shopping List
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={!useShoppingList}
              onChange={() => setUseShoppingList(false)}
            />
            Enter My Ingredients
          </label>
        </div>

        {/* Input field only if user chooses manual input */}
        {!useShoppingList && (
          <Input
            placeholder="e.g. tomatoes, onions, rice"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
        )}

        <Button onClick={generateRecipes} disabled={loading}>
          {loading ? 'Generating…' : '🍳 Generate Recipes'}
        </Button>
      </CardContent>
    </Card>
  );
}
