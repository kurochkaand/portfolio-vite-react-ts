import React from "react";
import ReactDOM from "react-dom/client";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeaderComponent />
    <FooterComponent />
  </React.StrictMode>
);
