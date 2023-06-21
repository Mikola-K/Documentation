import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TripAdvisorWrapper from "./TripAdvisor";
import VisitorAppWrapper from "./App";
import MyObjectWrapper from "./components/MyObjectComponent";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/store/visitors/:id" element={<VisitorAppWrapper />} />
        <Route path="/store/tripAdvisor/:id" element={<TripAdvisorWrapper />} />
        <Route
          path="/store/visitors/:visitorId/:myObjectId"
          element={<MyObjectWrapper />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
