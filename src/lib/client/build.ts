import { BuildConfig } from "bun";
import path from "node:path";
import fs from "node:fs/promises";
import { tailwindcssPlugin } from "../../../utils/tailwindPlugin";

const BUILD_DIR = path.resolve(import.meta.dir, "dist");

await fs.rm(BUILD_DIR, { recursive: true, force: true });

export const clientBuilderConfig: BuildConfig = {
  entrypoints: [
    // path.resolve(import.meta.dir, "../../app.tsx"),
    path.join(import.meta.dir, "/hydrate.tsx"),
  ],
  outdir: path.join(import.meta.dir, "/dist"),
  minify: true,
  target: "browser",
  plugins: [tailwindcssPlugin],
};
