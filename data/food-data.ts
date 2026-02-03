import { FoodCategory, FoodItem } from "./food-types";


export const categoryInfo: Record<FoodCategory, { label: string; icon: string; description: string }> = {
  protein: {
    label: 'Proteins',
    icon: '🥩',
    description: 'Meat, fish, eggs, and legumes',
  },
  carbs: {
    label: 'Carbohydrates',
    icon: '🍞',
    description: 'Grains, bread, pasta, and rice',
  },
  vegetables: {
    label: 'Vegetables',
    icon: '🥬',
    description: 'Fresh and leafy greens',
  },
  dairy: {
    label: 'Dairy',
    icon: '🧀',
    description: 'Milk, cheese, and yogurt',
  },
  fruits: {
    label: 'Fruits',
    icon: '🍎',
    description: 'Fresh and dried fruits',
  },
  fats: {
    label: 'Fats & Oils',
    icon: '🫒',
    description: 'Healthy oils and nuts',
  },
};

export const foodItems: FoodItem[] = [
  // Proteins
  { id: 'p1', name: 'Chicken Breast', category: 'protein', unit: 'lb' },
  { id: 'p2', name: 'Salmon Fillet', category: 'protein', unit: 'lb' },
  { id: 'p3', name: 'Ground Beef', category: 'protein', unit: 'lb' },
  { id: 'p4', name: 'Eggs', category: 'protein', unit: 'dozen' },
  { id: 'p5', name: 'Tofu', category: 'protein', unit: 'pack' },
  { id: 'p6', name: 'Shrimp', category: 'protein', unit: 'lb' },
  
  // Carbs
  { id: 'c1', name: 'Pasta', category: 'carbs', unit: 'box' },
  { id: 'c2', name: 'Brown Rice', category: 'carbs', unit: 'lb' },
  { id: 'c3', name: 'Whole Wheat Bread', category: 'carbs', unit: 'loaf' },
  { id: 'c4', name: 'Oats', category: 'carbs', unit: 'container' },
  { id: 'c5', name: 'Quinoa', category: 'carbs', unit: 'bag' },
  { id: 'c6', name: 'Potatoes', category: 'carbs', unit: 'lb' },
  
  // Vegetables
  { id: 'v1', name: 'Spinach', category: 'vegetables', unit: 'bunch' },
  { id: 'v2', name: 'Broccoli', category: 'vegetables', unit: 'head' },
  { id: 'v3', name: 'Carrots', category: 'vegetables', unit: 'bunch' },
  { id: 'v4', name: 'Bell Peppers', category: 'vegetables', unit: 'each' },
  { id: 'v5', name: 'Tomatoes', category: 'vegetables', unit: 'lb' },
  { id: 'v6', name: 'Onions', category: 'vegetables', unit: 'each' },
  
  // Dairy
  { id: 'd1', name: 'Milk', category: 'dairy', unit: 'gallon' },
  { id: 'd2', name: 'Greek Yogurt', category: 'dairy', unit: 'container' },
  { id: 'd3', name: 'Cheddar Cheese', category: 'dairy', unit: 'block' },
  { id: 'd4', name: 'Butter', category: 'dairy', unit: 'stick' },
  { id: 'd5', name: 'Cream Cheese', category: 'dairy', unit: 'pack' },
  { id: 'd6', name: 'Parmesan', category: 'dairy', unit: 'wedge' },
  
  // Fruits
  { id: 'f1', name: 'Apples', category: 'fruits', unit: 'each' },
  { id: 'f2', name: 'Bananas', category: 'fruits', unit: 'bunch' },
  { id: 'f3', name: 'Oranges', category: 'fruits', unit: 'each' },
  { id: 'f4', name: 'Blueberries', category: 'fruits', unit: 'pint' },
  { id: 'f5', name: 'Strawberries', category: 'fruits', unit: 'pint' },
  { id: 'f6', name: 'Lemons', category: 'fruits', unit: 'each' },
  
  // Fats
  { id: 'o1', name: 'Olive Oil', category: 'fats', unit: 'bottle' },
  { id: 'o2', name: 'Avocados', category: 'fats', unit: 'each' },
  { id: 'o3', name: 'Almonds', category: 'fats', unit: 'bag' },
  { id: 'o4', name: 'Coconut Oil', category: 'fats', unit: 'jar' },
  { id: 'o5', name: 'Walnuts', category: 'fats', unit: 'bag' },
  { id: 'o6', name: 'Peanut Butter', category: 'fats', unit: 'jar' },
];


