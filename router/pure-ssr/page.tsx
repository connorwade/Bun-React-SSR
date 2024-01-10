import { hydrateRoot } from "react-dom/client";
import Counter from "../../components/Counter";

function Page() {
  return (
    <html>
      <head>
        <title>Pure SSR</title>
        <script type="module" src="/dist/index.js"></script>
      </head>
      <body>
        <h1>Pure SSR</h1>
        <div id="counter"></div>
      </body>
    </html>
  );
}

export default Page;
