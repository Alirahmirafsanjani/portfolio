"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns `false` during server rendering and on the very first client render,
 * then `true` once the component has mounted.
 *
 * Gate any markup that depends on client-only state (such as the visitor's
 * reduced-motion preference) behind this hook so the first client render is
 * always identical to the server-rendered HTML and React never reports a
 * hydration mismatch.
 *
 * Implemented with `useSyncExternalStore` instead of `useState` + `useEffect`:
 * React itself owns the server → client transition, so there is no cascading
 * render and no `setState` inside an effect.
 */
const subscribe = () => () => {};

const getClientSnapshot = () => true;

const getServerSnapshot = () => false;

export function useHydrated() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
