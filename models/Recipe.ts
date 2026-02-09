import mongoose, { Schema, Document } from 'mongoose';
import { FoodCategory, FoodItem } from '@/data/food-types';

export interface RecipeDocument extends Document {
  title: string;
  description: string;
  image?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: {
    itemId: string; 
    amount: number;
  }[];
  instructions: string[];
  categories: FoodCategory[];
}

const RecipeSchema = new Schema<RecipeDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  ingredients: [
    {
      itemId: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  instructions: [{ type: String, required: true }],
  categories: [{ type: String, enum: ['protein','carbs','vegetables','dairy','fruits','fats'] }],
}, { timestamps: true });

export default mongoose.models.Recipe || mongoose.model<RecipeDocument>('Recipe', RecipeSchema);
