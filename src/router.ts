import { renderToReadableStream } from "react-dom/server";
import path from "node:path";
import fs from "node:fs/promises";
import { statSync } from "node:fs";
import App from "./app";

export async function streamFromRouter(pathExt: string) {
  if (router.has(pathExt)) {
    const content = router.get(pathExt);
    const layout = content.layout?.default;
    const page = content.page.default;
    const toStream = layout ? layout({ children: page() }) : page();
    const appToStream = App({ children: toStream });
    const stream = await renderToReadableStream(appToStream, {
      bootstrapScripts: ["/dist/hydrate.js"],
    });
    return stream;
  } else {
    return undefined;
  }
}

export const router = new Map<string, any>();

export const ROUTER_DIR = path.join(import.meta.dir, "/router");

export async function setupRouterDir(currentDirUrl: string) {
  const dirFiles = await fs.readdir(currentDirUrl);
  let url = currentDirUrl + "/";
  let urlPath = url.replace(ROUTER_DIR, "");
  let content = { layout: undefined, page: undefined };

  while (dirFiles.length > 0) {
    let file = dirFiles.pop()!;
    let stats = statSync(path.join(currentDirUrl, file));

    if (stats.isDirectory()) {
      setupRouterDir(path.join(currentDirUrl, file));
    } else if (path.parse(file).name === "layout") {
      content.layout = await import(path.join(currentDirUrl, file));
    } else if (path.parse(file).name === "page") {
      content.page = await import(path.join(currentDirUrl, file));
    }
  }

  router.set(urlPath, content);
}
