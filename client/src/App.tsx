import Counter from "../../components/Counter";
import ServerIsland from "../../components/ServerIsland";

function App() {
  return (
    <div className="App">
      <Counter />
      <ServerIsland />
      {/* <a href="/pure-ssr">Pure SSR</a> */}
    </div>
  );
}

export default App;
