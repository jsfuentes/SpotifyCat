import React, { Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "js/components/Loading.js";
import ErrorBoundary from "js/components/ErrorBoundary";

// const Landing = React.lazy(() => import("js/pages/Landing"));
const my404 = React.lazy(() => import("js/pages/my404"));
const Login = React.lazy(() => import("js/pages/Login"));

import Landing from "js/pages/Landing";

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
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/" component={Landing} />
          {/* <Route component={my404} /> */}
        </Switch>
      </BrowserRouter>
      {/* </Suspense> */}
    </ErrorBoundary>
  );
}
