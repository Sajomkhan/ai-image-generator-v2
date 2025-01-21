"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export type State = {
  imageRatio: string;
  size: { width: number; height: number };
  numberOfImage: number;
  imageUrls: [];
  prompt: string;
  isSubmitted: boolean;
  models: [];
  currentModel: string
};

export function AppWrapper({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage or default value
  const [state, setState] = useState<State>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("appState");
      return savedState
        ? JSON.parse(savedState)
        : {
            imageRatio: "16:9",
            size: { width: 1744, height: 981 },
            numberOfImage: 2,
            imageUrls: [],
            prompt: "",
            isSubmitted: false,
            models: [],
            currentModel: "flux"
          };
    }
    return {
      imageRatio: "16:9",
      size: { width: 1744, height: 981 },
      numberOfImage: 2,
      imageUrls: [],
      prompt: "",
      isSubmitted: false,
      models: [],
      currentModel: "flux"
    };
  });

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  const resetState = () => {
    localStorage.removeItem("appState");
    setState({
      imageRatio: "16:9",
      size: { width: 1744, height: 981 },
      numberOfImage: 2,
      imageUrls: [],
      prompt: "",
      isSubmitted: false,
      models: state.models,
      currentModel: "flux"
    });
  };

  return (
    <AppContext.Provider value={{ state, setState, resetState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
