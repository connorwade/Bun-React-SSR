import { ReactNode } from "react";

function Layout(props: { children?: ReactNode }) {
  return (
    <>
      <h1 className="text-xl">Bun + React + SSR</h1>
      {props.children}
    </>
  );
}

export default Layout;
