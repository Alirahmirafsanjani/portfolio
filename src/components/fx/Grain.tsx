const NOISE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter><rect width="180" height="180" filter="url(#n)"/></svg>`;

const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

/**
 * Fixed film-grain overlay. Sits above the page content but never intercepts
 * pointer events.
 *
 * Plain alpha instead of `mix-blend-overlay`: a blend mode on a viewport-sized
 * fixed layer forces a full-page composite on every frame, which is a lot of
 * work for a 4.5% texture.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05]"
      style={{ backgroundImage: NOISE_URL, backgroundRepeat: "repeat" }}
    />
  );
}
