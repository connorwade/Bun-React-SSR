import { helloStream } from "./components/HelloWorld";
import fs from "node:fs";
import path from "node:path";
import { renderToReadableStream } from "react-dom/server";

async function streamFromRouter(pathName: string) {
  const file = path.join(import.meta.dir, "/router", pathName, "/page.tsx");
  const page = await import(file);
  const stream = await renderToReadableStream(
    page.default({ title: "Pure SSR" })
  );
  return stream;
}

Bun.serve({
  port: 6543,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.includes("/dist")) {
      const file = fs.readFileSync(
        path.join(import.meta.dir, "/client", url.pathname)
      );
      return new Response(file, {
        headers: { "Content-Type": "text/javascript" },
      });
    }

    switch (url.pathname) {
      case "/":
        const html = fs.readFileSync(
          path.join(import.meta.dir, "/client/index.html")
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });

      case "/pure-ssr":
        const stream = await streamFromRouter(url.pathname);
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        });

      case "/componenttest":
        return new Response(helloStream, {
          headers: { "Content-Type": "text/html" },
        });

      default:
        return new Response(helloStream, {
          headers: { "Content-Type": "text/html" },
        });
    }
  },
});
