import path from "node:path";

await Bun.build({
  entrypoints: [path.join(import.meta.dir, "/src/index.ts")],
  outdir: path.join(import.meta.dir, "/dist"),
});
