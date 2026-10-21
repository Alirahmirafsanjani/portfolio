import { cacheLife } from "next/cache";

/**
 * Renders the current year.
 *
 * `use cache` tells Next.js the value is stable enough to be cached, so the
 * footer copyright stays correct without making the page dynamic. The `max`
 * profile only refreshes it roughly once a year — exactly how often a year
 * value changes.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("max");

  return <>{new Date().getFullYear()}</>;
}
