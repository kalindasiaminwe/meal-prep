"use client";

import { useState, useCallback } from "react";
import { ShoppingItem, FoodItem } from "@/data/food-types";
export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const addItem = useCallback(
    (foodItem: FoodItem, quantity: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === foodItem.id);

        if (existing) {
          return prev.map((item) =>
            item.id === foodItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...prev, { ...foodItem, quantity, checked: false }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleChecked = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    },
    [removeItem]
  );

  const clearChecked = useCallback(() => {
    setItems((prev) => prev.filter((item) => !item.checked));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    addItem,
    removeItem,
    toggleChecked,
    updateQuantity,
    clearChecked,
    clearAll,
  };
}
