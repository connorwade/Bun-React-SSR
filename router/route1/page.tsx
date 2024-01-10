import { hydrateRoot } from "react-dom/client";
import Counter from "../../components/Counter";

function Page() {
  return (
    <html>
      <head>
        <title>Route 1</title>
        <script type="module" src="/dist/index.js"></script>
      </head>
      <body>
        <h1>Route 1</h1>
      </body>
    </html>
  );
}

export default Page;
