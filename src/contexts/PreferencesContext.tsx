import { NewsSourceUnion } from "@/types/news.types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserPreferences {
  categories: string[];
  newsSources: NewsSourceUnion[];
}

interface PreferencesContextType {
  // Categories
  categories: string[];
  addCategories: (categories: string[]) => void;
  removeCategory: (category: string) => void;
  clearCategories: () => void;

  // News Sources
  newsSources: NewsSourceUnion[];
  addNewsSources: (sources: string[]) => void;
  removeNewsSource: (source: string) => void;
  clearNewsSources: () => void;
}

const STORAGE_KEY = "user_preferences";

const defaultPreferences: UserPreferences = {
  categories: [],
  newsSources: [],
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  // Categories functions
  const addCategories = (categories: string[]) => {
    setPreferences((prev) => ({
      ...prev,
      categories: [...categories],
    }));
  };

  const removeCategory = (category: string) => {
    setPreferences((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const clearCategories = () => {
    setPreferences((prev) => ({
      ...prev,
      categories: [],
    }));
  };

  // News Sources functions
  const addNewsSources = (sources: NewsSourceUnion[]) => {
    setPreferences((prev) => ({
      ...prev,
      newsSources: [...sources],
    }));
  };

  const removeNewsSource = (source: string) => {
    setPreferences((prev) => ({
      ...prev,
      newsSources: prev.newsSources.filter((s) => s !== source),
    }));
  };

  const clearNewsSources = () => {
    setPreferences((prev) => ({
      ...prev,
      newsSources: [],
    }));
  };

  return (
    <PreferencesContext.Provider
      value={{
        categories: preferences.categories,
        addCategories,
        removeCategory,
        clearCategories,

        newsSources: preferences.newsSources,
        addNewsSources,
        removeNewsSource,
        clearNewsSources,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};
