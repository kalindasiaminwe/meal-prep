"use client";
import { ShoppingCart, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeTab: "browse" | "recipes" | "planner" | "list";
  onTabChange: (tab: "browse" | "recipes" | "planner" | "list") => void;
  cartCount: number;
}

export function Header({ activeTab, onTabChange, cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border max-w-6xl mx-auto px-4">
      <div className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                PantryPal
              </h1>
              <p className="text-xs text-muted-foreground">
                Your kitchen companion
              </p>
            </div>
          </div>

          <button
            onClick={() => onTabChange("list")}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>

        <nav className="flex gap-1 bg-muted p-1 rounded-lg">
          {[
            { key: "browse", label: "Browse Ingredients" },
            { key: "list", label: "Shopping List" },
            { key: "planner", label: "Meal Planner" },
            { key: "recipes", label: "Recipes" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key as HeaderProps["activeTab"])}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200",
                "max-sm:py-1.5 max-sm:px-2 max-sm:text-xs", // smaller tabs on mobile
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
