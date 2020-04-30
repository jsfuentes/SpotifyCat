import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "js/components/Loading.js";
import ErrorBoundary from "js/components/ErrorBoundary";

import Landing from "js/pages/Landing";
import my404 from "js/pages/my404";
import Login from "js/pages/Login";

toast.configure({
  position: toast.POSITION.TOP_CENTER,
  toastClassName: "p-5 text-green-500 bg-green-100 rounded w-full font-medium",
  autoClose: 5000,
});

// export default function Router() {
//   const [t, setT] = useState(0);
//   return (
//     <div
//       className="bg-red-400 hover:bg-blue-500"
//       onClick={() => setT((t) => t + 1)}
//     >
//       {" "}
//       Brittas {t}{" "}
//     </div>
//   );
// }

export default function Router() {
  return (
    <ErrorBoundary>
      {/* <Suspense fallback={<Loading />}> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
          <Route component={my404} />
        </Switch>
      </BrowserRouter>
      {/* </Suspense> */}
    </ErrorBoundary>
  );
}
