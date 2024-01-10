import fs from "node:fs";
import path from "node:path";
import { renderToReadableStream } from "react-dom/server";

async function streamFromRouter(pathExt: string) {
  if (router.has(pathExt)) {
    const stream = await renderToReadableStream(router.get(pathExt));
    return stream;
  } else {
    return undefined;
  }
}

const router = new Map<string, any>();

let currentLayout: any;

async function readRouterDir(dirPath: string, dir: string[]) {
  let urlPath = dirPath.replace(import.meta.dir + "/router", "");
  if (urlPath === "") {
    urlPath = "/";
  }

  if (dir.includes("layout.tsx")) {
    const layout = await import(path.join(dirPath, "layout.tsx"));
    currentLayout = layout.default;
    dir = dir.filter((file) => file !== "layout.tsx");
  }

  while (dir.length > 0) {
    const file = dir.pop()!;
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      await readRouterDir(
        path.join(dirPath, file),
        fs.readdirSync(path.join(dirPath, file))
      );
    } else if (path.parse(file).name === "page") {
      const page = await import(path.join(dirPath, file));
      if (currentLayout) {
        router.set(urlPath, currentLayout({ children: page.default() }));
      } else {
        router.set(urlPath, page.default());
      }
    }
  }
}

readRouterDir(
  path.join(import.meta.dir, "/router"),
  fs.readdirSync(path.join(import.meta.dir, "/router"))
);

Bun.serve({
  port: 6543,
  async fetch(req) {
    console.log(router);
    const url = new URL(req.url);

    if (url.pathname.includes("/dist")) {
      const file = fs.readFileSync(
        path.join(import.meta.dir, "/client", url.pathname)
      );
      return new Response(file, {
        headers: { "Content-Type": "text/javascript" },
      });
    }

    if (router.has(url.pathname)) {
      console.log(`Serving ${router.get(url.pathname)} from ${url.pathname} `);
      const stream = await streamFromRouter(url.pathname);
      if (stream) {
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});
