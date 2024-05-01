import { clientBuilderConfig } from "./src/lib/client/build";
import { startServer } from "./src/server";

// build the client
let build = await Bun.build(clientBuilderConfig);
console.log("BUILD", build.success, build.logs);

// start the server
await startServer();
