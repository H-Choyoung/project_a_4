import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Detail from "./detail";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/detail" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
