import React from "react";
import  ReactDOM  from "react-dom";

import './index.css'
import App from "./App"
import { ContextProider } from './contexts/ContextProvider'

ReactDOM.render(
    <ContextProider >
        <App />
    </ContextProider>
    , document.getElementById("root"))