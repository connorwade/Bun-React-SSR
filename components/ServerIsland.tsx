"use client";
import { Suspense, useEffect, useState } from "react";
import { api } from "../client/src/api";
import Loading from "./Loading";

function ServerIsland() {
  const [serverComponent, setServerComponent] = useState(null);

  useEffect(() => {
    api.get("/helloworld").then((data) => {
      setServerComponent(data);
    });
  }, [serverComponent]);

  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <div dangerouslySetInnerHTML={{ __html: serverComponent }}></div>
      </Suspense>
    </>
  );
}

export default ServerIsland;
