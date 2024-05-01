import { hydrateRoot } from "react-dom/client";
import App from "../../app.tsx";
import Counter from "../components/Counter.tsx";
import "./app.css";

hydrateRoot(document, <Counter />);
