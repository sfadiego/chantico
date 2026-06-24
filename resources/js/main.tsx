import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

const container = document.getElementById("root");
const options = {};
createRoot(container!, options).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
