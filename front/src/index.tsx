import ReactDOM from "react-dom/client";
import "./components/css/index.css";
import Router from "router";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        {/* <App /> */}
        <Router />
        {/* <Router /> */}
    </BrowserRouter>
);
