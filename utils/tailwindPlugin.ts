import { BunPlugin, plugin } from "bun";
import postcss from "postcss";
import postcssConfig from "../postcss.config";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export const tailwindcssPlugin: BunPlugin = {
  name: "tailwindcss",
  async setup(build) {
    build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
      const file = Bun.file(path);
      const css = await file.text();

      const result = await postcss([tailwindcss, autoprefixer]).process(css, {
        from: path,
      });

      await Bun.write(path.replace("/app.css", "/dist/app.css"), result.css);

      return { contents: result.css, loader: "ts" };
    });
  },
};
