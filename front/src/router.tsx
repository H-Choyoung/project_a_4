import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Detail from "./detail";
import Props from "./props";
// import Test from "test";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/test" element={<Props />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
