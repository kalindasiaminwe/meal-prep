import { NextResponse } from "next/server";
import { Recipe } from "@/models/Recipe";
import { connectDB } from "@/lib/dbConnect";

export async function GET(req: Request) {
  try {
    await connectDB();
    const recipes = await Recipe.find();
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
