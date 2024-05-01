import { ReactNode } from "react";
import Layout from "./router/layout";
import Counter from "./lib/components/Counter";
// import "../client/app.css";

function App({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/dist/app.css" />
        <title>App Level + Bun + React + SSR</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

export default App;
