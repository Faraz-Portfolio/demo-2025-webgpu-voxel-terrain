import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import { UI } from "./UI";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <UI />
  </React.StrictMode>
);
