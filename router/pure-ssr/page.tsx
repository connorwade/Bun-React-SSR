import { hydrateRoot } from "react-dom/client";
import Counter from "../../components/Counter";

function Page(props: { title: string }) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <script type="module" src="/dist/index.js"></script>
      </head>
      <body>
        <h1>{props.title}</h1>
        <div id="counter"></div>
      </body>
    </html>
  );
}

export default Page;
