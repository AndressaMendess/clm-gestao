import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { initializeClarity } from "./lib/clarity";
import "./index.css";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/dashboard.css";
import "./styles/pages/attendance.css";
import "./styles/pages/overview.css";

initializeClarity(import.meta.env.VITE_CLARITY_PROJECT_ID);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
