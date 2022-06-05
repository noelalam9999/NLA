import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "../components/loading/Loading";

const LoginPage = lazy(() => import("../pages/loginPage/LoginPage.js"));
const InsightsPage = lazy(() =>
  import("../pages/insightsPage/InsightsPage.js")
);
const DashboardPage = lazy(() =>
  import("../pages/dashboardPage/DashboardPage.js")
);
const DesignStudioPage = lazy(() =>
  import("../pages/designStudioPage/DesignStudioPage.js")
);
const ProtectedRoute = lazy(() =>
  import("../protectedRoute/ProtectedRoute.js")
);

const Config = () => {
  const auth = localStorage.getItem("auth");

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute component={DashboardPage}></ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/insights/:id"
            element={<ProtectedRoute component={InsightsPage}></ProtectedRoute>}
          ></Route>
          <Route
            exact
            path="/design-studio/:id"
            element={
              <ProtectedRoute component={DesignStudioPage}></ProtectedRoute>
            }
          ></Route>
          {/* <Route exact path="/insights" element={<InsightsPage />}></Route> */}
          {/* <Route exact path="/dashboard" element={<DashboardPage />}></Route> */}
          {/* <Route
            exact
            path="/design-studio"
            element={<DesignStudioPage />}
          ></Route> */}
          <Route exact path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Config;
