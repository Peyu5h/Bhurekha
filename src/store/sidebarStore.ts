import { createGlobalState } from "./index";

export const useSidebarExpand = createGlobalState("isSidebarExpanded", {
  value: false,
});

export const useSidebarActions = () => {
  const { setData } = useSidebarExpand();

  return {
    toggle: () => setData((state) => ({ value: !state.value })),
    expand: () => setData({ value: true }),
    collapse: () => setData({ value: false }),
  };
};
