import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DailyIframe from "@daily-co/daily-js";

import BrowserUnsupported from "src/components/BrowserUnsupported/BrowserUnsupported";
import Loading from "src/components/Loading.js";
import ErrorBoundary from "src/components/ErrorBoundary";

import App from "src/pages/App.js";
import Landing from "src/pages/Landing";
import my404 from "src/pages/my404";
import Login from "src/pages/Login";
import UserContext from "src/contexts/UserContext.js";

toast.configure({
  position: toast.POSITION.TOP_CENTER,
  toastClassName: "p-5 text-green-500 bg-green-100 rounded w-full font-medium",
  autoClose: 5000,
});

export default function Router() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ErrorBoundary>
        {/* <Suspense fallback={<Loading />}> */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Landing} />
            <Route
              path="/event/:id"
              render={() =>
                DailyIframe.supportedBrowser().supported ? (
                  <App />
                ) : (
                  <BrowserUnsupported />
                )
              }
            />
            <Route component={my404} />
          </Switch>
        </BrowserRouter>
        {/* </Suspense> */}
      </ErrorBoundary>
    </UserContext.Provider>
  );
}
