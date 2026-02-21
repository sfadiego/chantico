import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@css/dashboardLayout.css";

const container = document.getElementById("root");
const options = {};
createRoot(container!, options).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
