import { createContext, useContext } from "react";
import type Lenis from "lenis";

export interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
