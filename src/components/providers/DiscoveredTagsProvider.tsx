"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface DiscoveredTagsContextValue {
  tags: string[];
  addTags: (tags: string[]) => void;
}

const DiscoveredTagsContext = createContext<DiscoveredTagsContextValue | null>(
  null,
);

export function DiscoveredTagsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tags, setTags] = useState<string[]>([]);

  const addTags = useCallback((newTags: string[]) => {
    if (newTags.length === 0) return;
    setTags((prev) => {
      const next = new Set(prev);
      for (const tag of newTags) {
        next.add(tag);
      }
      return Array.from(next);
    });
  }, []);

  const value = useMemo(() => ({ tags, addTags }), [tags, addTags]);

  return (
    <DiscoveredTagsContext.Provider value={value}>
      {children}
    </DiscoveredTagsContext.Provider>
  );
}

export function useDiscoveredTags() {
  const context = useContext(DiscoveredTagsContext);
  if (!context) {
    throw new Error(
      "useDiscoveredTags must be used within DiscoveredTagsProvider",
    );
  }
  return context;
}
