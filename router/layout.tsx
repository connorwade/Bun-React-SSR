import { ReactNode } from "react";

function Layout(props: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>Bun + React + SSR</title>
        <script type="module" src="/dist/index.js"></script>
      </head>
      <body>
        <h1>Bun + React + SSR</h1>
        {props.children}
      </body>
    </html>
  );
}

export default Layout;
