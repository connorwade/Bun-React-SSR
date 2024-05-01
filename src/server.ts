import path from "node:path";
import { ROUTER_DIR, router, setupRouterDir, streamFromRouter } from "./router";

export async function startServer() {
  await setupRouterDir(ROUTER_DIR);
  console.log(router);

  console.log("Starting server on http://localhost:6543");

  Bun.serve({
    port: 6543,
    async fetch(req) {
      const url = new URL(req.url);

      if (url.pathname.includes("/dist")) {
        const staticTypes = new Map([
          ["css", "text/css"],
          ["js", "text/javascript"],
          ["map", "application/json"],
          ["html", "text/html"],
        ]);
        const file = Bun.file(
          path.join(import.meta.dir, "/lib/client", url.pathname)
        );

        const ext = path.parse(file.name!).ext;
        const type = staticTypes.get(ext.slice(1)) || "text/plain";

        return new Response(await file.text(), {
          headers: {
            "Content-Type": type,
          },
        });
      }

      if (router.has(url.pathname)) {
        console.log(
          `Serving ${router.get(url.pathname)} from ${url.pathname} `
        );
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
}
