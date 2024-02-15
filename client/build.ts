import path from "node:path";

const result = await Bun.build({
  entrypoints: [path.join(import.meta.dir, "/src/index.ts")],
  outdir: path.join(import.meta.dir, "/dist"),
});

if (!result.success) {
  console.error("Build failed!");
  for (const message of result.logs) {
    console.error(message);
  }
}
