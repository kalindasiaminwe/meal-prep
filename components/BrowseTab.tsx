"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "./cards/CategoryCard";
import { FoodItemCard } from "./cards/FoodItemCard";
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
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogSearch, setDialogSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = useMemo(() => {
    let items = foodItems;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      items = items.filter((i) => i.category === selectedCategory);
    }

    return items;
  }, [searchQuery, selectedCategory]);

  const dialogItems = useMemo(() => {
    if (!dialogSearch.trim()) return filteredItems;
    const q = dialogSearch.toLowerCase();
    return filteredItems.filter((i) =>
      i.name.toLowerCase().includes(q)
    );
  }, [dialogSearch, filteredItems]);

  useEffect(() => {
    if ((searchQuery || selectedCategory) && filteredItems.length > 0) {
      setOpen(true);
    }
  }, [searchQuery, selectedCategory, filteredItems.length]);

  const closeDialog = () => {
    setOpen(false);
    setSearchQuery("");
    setDialogSearch("");
    setSelectedCategory(null);
  };

  return (
    <div className=" overflow-x-hidden px-3 pb-6 space-y-6">
      {/* Search */}
      <div className="relative max-w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for ingredients..."
          className="pl-9 pr-9 h-10 text-sm w-full"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Categories */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Food Categories</h2>
        <p className="text-xs text-muted-foreground">
          Select a category to browse ingredients
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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

      {/* Dialog */}
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogContent className="w-screen max-w-[100vw] max-h-[100dvh] overflow-x-hidden p-0">
          <DialogHeader className="p-3 border-b">
            <DialogTitle className="text-sm truncate">
              {selectedCategory
                ? categoryInfo[selectedCategory].label
                : "Results"}{" "}
              ({dialogItems.length})
            </DialogTitle>
          </DialogHeader>

          {/* Dialog search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={dialogSearch}
                onChange={(e) => setDialogSearch(e.target.value)}
                placeholder="Search results..."
                className="pl-9 pr-9 h-9 text-sm"
              />
              {dialogSearch && (
                <button
                  onClick={() => setDialogSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <ScrollArea className="h-[calc(100dvh-120px)] p-3">
            <div className="flex flex-col gap-2 min-w-0">
              {dialogItems.map((item) => (
                <FoodItemCard
                  key={item.id}
                  item={item}
                  onAdd={() => onAddItem(item)}
                />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
