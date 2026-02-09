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
  {
    id: 'p1', name: 'Chicken Breast', category: 'protein', unit: 'lb',
    quantity: 0
  },
  {
    id: 'p2', name: 'Salmon Fillet', category: 'protein', unit: 'lb',
    quantity: 0
  },
  {
    id: 'p3', name: 'Ground Beef', category: 'protein', unit: 'lb',
    quantity: 0
  },
  {
    id: 'p4', name: 'Eggs', category: 'protein', unit: 'dozen',
    quantity: 0
  },
  {
    id: 'p5', name: 'Tofu', category: 'protein', unit: 'pack',
    quantity: 0
  },
  {
    id: 'p6', name: 'Shrimp', category: 'protein', unit: 'lb',
    quantity: 0
  },
  
  // Carbs
  {
    id: 'c1', name: 'Pasta', category: 'carbs', unit: 'box',
    quantity: 0
  },
  {
    id: 'c2', name: 'Brown Rice', category: 'carbs', unit: 'lb',
    quantity: 0
  },
  {
    id: 'c3', name: 'Whole Wheat Bread', category: 'carbs', unit: 'loaf',
    quantity: 0
  },
  {
    id: 'c4', name: 'Oats', category: 'carbs', unit: 'container',
    quantity: 0
  },
  {
    id: 'c5', name: 'Quinoa', category: 'carbs', unit: 'bag',
    quantity: 0
  },
  {
    id: 'c6', name: 'Potatoes', category: 'carbs', unit: 'lb',
    quantity: 0
  },
  
  // Vegetables
  {
    id: 'v1', name: 'Spinach', category: 'vegetables', unit: 'bunch',
    quantity: 0
  },
  {
    id: 'v2', name: 'Broccoli', category: 'vegetables', unit: 'head',
    quantity: 0
  },
  {
    id: 'v3', name: 'Carrots', category: 'vegetables', unit: 'bunch',
    quantity: 0
  },
  {
    id: 'v4', name: 'Bell Peppers', category: 'vegetables', unit: 'each',
    quantity: 0
  },
  {
    id: 'v5', name: 'Tomatoes', category: 'vegetables', unit: 'lb',
    quantity: 0
  },
  {
    id: 'v6', name: 'Onions', category: 'vegetables', unit: 'each',
    quantity: 0
  },
  
  // Dairy
  {
    id: 'd1', name: 'Milk', category: 'dairy', unit: 'gallon',
    quantity: 0
  },
  {
    id: 'd2', name: 'Greek Yogurt', category: 'dairy', unit: 'container',
    quantity: 0
  },
  {
    id: 'd3', name: 'Cheddar Cheese', category: 'dairy', unit: 'block',
    quantity: 0
  },
  {
    id: 'd4', name: 'Butter', category: 'dairy', unit: 'stick',
    quantity: 0
  },
  {
    id: 'd5', name: 'Cream Cheese', category: 'dairy', unit: 'pack',
    quantity: 0
  },
  {
    id: 'd6', name: 'Parmesan', category: 'dairy', unit: 'wedge',
    quantity: 0
  },
  
  // Fruits
  {
    id: 'f1', name: 'Apples', category: 'fruits', unit: 'each',
    quantity: 0
  },
  {
    id: 'f2', name: 'Bananas', category: 'fruits', unit: 'bunch',
    quantity: 0
  },
  {
    id: 'f3', name: 'Oranges', category: 'fruits', unit: 'each',
    quantity: 0
  },
  {
    id: 'f4', name: 'Blueberries', category: 'fruits', unit: 'pint',
    quantity: 0
  },
  {
    id: 'f5', name: 'Strawberries', category: 'fruits', unit: 'pint',
    quantity: 0
  },
  {
    id: 'f6', name: 'Lemons', category: 'fruits', unit: 'each',
    quantity: 0
  },
  
  // Fats
  {
    id: 'o1', name: 'Olive Oil', category: 'fats', unit: 'bottle',
    quantity: 0
  },
  {
    id: 'o2', name: 'Avocados', category: 'fats', unit: 'each',
    quantity: 0
  },
  {
    id: 'o3', name: 'Almonds', category: 'fats', unit: 'bag',
    quantity: 0
  },
  {
    id: 'o4', name: 'Coconut Oil', category: 'fats', unit: 'jar',
    quantity: 0
  },
  {
    id: 'o5', name: 'Walnuts', category: 'fats', unit: 'bag',
    quantity: 0
  },
  {
    id: 'o6', name: 'Peanut Butter', category: 'fats', unit: 'jar',
    quantity: 0
  },
];


