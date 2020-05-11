import React, { useEffect, useState } from "react";

import conf from "src/conf";
import Loading from "src/components/Loading.js";
import { axios } from "src/utils/utils.js";
const debug = require("debug")("app:pages:top");

const TOP_COUNT = 1;

function Top() {
  const [top, setTop] = useState(null);

  useEffect(() => {
    async function f() {
      try {
        const resp = await axios.get(`/api/spotify/top?limit=${TOP_COUNT}`);
        setTop(resp.data);
      } catch (err) {
        if (err.response.status === 401) {
          debug("Unauthorized");
          window.location.href = conf.get("CLIENT_URL") + "/auth/spotify";
        } else {
          console.error("Failed to fetch", err);
        }
      }
    }

    f();
  }, []);

  if (!top) return <Loading />;

  return <div>{JSON.stringify(top)}</div>;
}

export default Top;
