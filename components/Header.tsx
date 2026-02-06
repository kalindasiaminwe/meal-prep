"use client";

import { ShoppingCart, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeTab: "browse" | "recipes" | "planner" | "list";
  onTabChange: (tab: HeaderProps["activeTab"]) => void;
  cartCount: number;
}

export function Header({ activeTab, onTabChange, cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 overflow-x-hidden border-b bg-background/95 backdrop-blur">
      <div className=" px-3 py-2 sm:px-4 sm:py-4 min-w-0">
        {/* Top row */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>

            <div className="min-w-0">
              <h1 className="font-display font-bold text-sm sm:text-xl truncate">
                PantryPal
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                Your kitchen companion
              </p>
            </div>
          </div>

          <button
            onClick={() => onTabChange("list")}
            className="relative shrink-0 p-2 rounded-full hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Tabs */}
        <nav className="grid grid-cols-1 md:grid-cols-4 gap-1 bg-muted p-1 rounded-lg max-w-full">
          {[
            { key: "browse", label: "Browse" },
            { key: "list", label: "List" },
            { key: "recipes", label: "Recipes" },
            { key: "planner", label: "Planner" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key as HeaderProps["activeTab"])}
              className={cn(
                "w-full min-w-0 px-2 py-2 text-xs sm:text-sm rounded-md truncate transition",
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
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
