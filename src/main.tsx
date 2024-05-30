import React from "react";
import ReactDOM from "react-dom/client";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import "./main.css";
import TestComponent from "./TestComponent";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeaderComponent />
    <TestComponent />
    <App />
    <FooterComponent />
  </React.StrictMode>
);
