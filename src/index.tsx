import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";


console.log('index-node', process.env.NODE_ENV)
console.log('index-base', process.env.BASE_ENV)


const root = document.getElementById("root");
if (root) {
    createRoot(root).render(<App />);
}
