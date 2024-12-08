import { useState, useCallback } from "react";

export function useSelectedItems({ size }: { size: number }) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [allSelected, setAllSelected] = useState(false);

  const toggleAllItems = useCallback((ids: string[]) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      const allAreSelected = ids.every((id) => newSet.has(id));

      if (allAreSelected) {
        ids.forEach((id) => newSet.delete(id));
        setAllSelected(false);
      } else {
        ids.forEach((id) => newSet.add(id));
        setAllSelected(true);
      }

      return newSet;
    });
  }, []);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      setAllSelected(newSet.size === size);
      return newSet;
    });
  };

  return { selectedItems, toggleItem, toggleAllItems, allSelected };
}
