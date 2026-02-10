import mongoose, { Schema, models } from "mongoose";

const IngredientSchema = new Schema({
  item: {
    id: String,
    name: String,
    category: String,
    unit: String,
    image: String,
  },
  amount: Number,
});

const RecipeSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    prepTime: Number,
    cookTime: Number,
    servings: Number,
    ingredients: [IngredientSchema],
    instructions: [String],
    categories: [String],
  },
  { timestamps: true }
);

export const Recipe =
  models.Recipe || mongoose.model("Recipe", RecipeSchema);
