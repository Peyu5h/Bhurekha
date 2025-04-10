import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SidebarState {
  isExpanded: boolean;
  actions: {
    toggle: () => void;
    setExpanded: (value: boolean) => void;
  };
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isExpanded: false,
      actions: {
        toggle: () => set((state) => ({ isExpanded: !state.isExpanded })),
        setExpanded: (value: boolean) => set({ isExpanded: value }),
      },
    }),
    {
      name: "sidebar-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useSidebarExpand = () => {
  const isExpanded = useSidebarStore((state) => state.isExpanded);
  return {
    data: {
      value: isExpanded,
    },
  };
};

export const useSidebarActions = () => {
  const actions = useSidebarStore((state) => state.actions);
  return actions;
};
