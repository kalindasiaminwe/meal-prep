"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FoodItemCard } from "./cards/FoodItemCard";
import { CategoryCard } from "./cards/CategoryCard";
import { foodItems, categoryInfo } from "@/data/food-data";
import { FoodCategory, FoodItem } from "@/data/food-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories: FoodCategory[] = [
  "protein",
  "carbs",
  "vegetables",
  "dairy",
  "fruits",
  "fats",
];

interface BrowseTabProps {
  onAddItem: (item: FoodItem) => void;
}

export function BrowseTab({ onAddItem }: BrowseTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogSearch, setDialogSearch] = useState(""); // search inside dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtered items based on main search/category
  const filteredItems = useMemo(() => {
    let items = foodItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      items = items.filter((item) => item.category === selectedCategory);
    }

    return items;
  }, [searchQuery, selectedCategory]);

  // Filtered items inside dialog (with internal search)
  const dialogItems = useMemo(() => {
    if (!dialogSearch.trim()) return filteredItems;

    const query = dialogSearch.toLowerCase();
    return filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [dialogSearch, filteredItems]);

  // Automatically open dialog on search or category select
  useEffect(() => {
    if ((searchQuery.trim() || selectedCategory) && filteredItems.length > 0) {
      setIsDialogOpen(true);
    }
  }, [searchQuery, selectedCategory, filteredItems.length]);

  // Handle closing dialog: clear search, dialog search, and selected category
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSearchQuery("");
    setDialogSearch("");
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto px-4 pb-10 flex flex-col">
      {/* Search Section */}
      <section>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12 text-base bg-card border-border"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Food Categories
        </h2>
        <p className="text-muted-foreground mb-6">
          Select a category to browse ingredients
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
            />
          ))}
        </div>
      </section>

      {/* Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b border-border">
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              {selectedCategory
                ? categoryInfo[selectedCategory].label
                : "Search Results"}
              {dialogItems.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  ({dialogItems.length})
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {/* Search inside dialog */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search within results..."
                value={dialogSearch}
                onChange={(e) => setDialogSearch(e.target.value)}
                className="pl-10 pr-10 h-10 text-base bg-card border-border"
              />
              {dialogSearch && (
                <button
                  onClick={() => setDialogSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          <ScrollArea className="max-h-[60vh] p-4">
            {dialogItems.length > 0 ? (
              <div className="grid gap-3">
                {dialogItems.map((item) => (
                  <FoodItemCard
                    key={item.id}
                    item={item}
                    onAdd={() => onAddItem(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No ingredients found.
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
