import { hydrateRoot } from "react-dom/client";
import Counter from "../components/Counter";
import ServerIsland from "../components/ServerIsland";

function Page() {
  return (
    <>
      <h2>Home Page</h2>
      {/* <div id="root"></div> */}
      <Counter />
    </>
  );
}

export default Page;
