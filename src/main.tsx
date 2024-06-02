import React from "react";
import ReactDOM from "react-dom/client";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import "./main.css";
import TestComponent from "./TestComponent";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeaderComponent />
    <TestComponent />
    <FooterComponent />
  </React.StrictMode>
);
