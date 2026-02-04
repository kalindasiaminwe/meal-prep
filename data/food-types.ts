export type FoodCategory = 
  | 'protein'
  | 'carbs'
  | 'vegetables'
  | 'dairy'
  | 'fruits'
  | 'fats';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  unit: string;
  image?: string;
  quantity: number;
}

export interface ShoppingItem extends FoodItem {
  quantity: number;
  checked: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: {
    item: FoodItem;
    amount: number;
  }[];
  instructions: string[];
  categories: FoodCategory[];
}
