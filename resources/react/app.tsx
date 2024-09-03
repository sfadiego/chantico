import React from 'react'
import { createRoot } from 'react-dom/client';
import Main from "./Main";

const root = document.getElementById('app');
const appRoot = root && createRoot(root);

appRoot && appRoot.render(<Main />);
