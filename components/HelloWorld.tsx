import { renderToReadableStream } from "react-dom/server";

function Component(props: { message: string }) {
  return <h1>{props.message}</h1>;
}

export const createStream = async (props: { message: string }) =>
  await renderToReadableStream(<Component {...props} />);

export const helloStream = await renderToReadableStream(
  <Component message="Hello from server!" />
);
