// made by sangho...이어붙이기 테스트 중
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Detail from "./components/screens/Detail";
// import Detail from "./detail";
// import Props from "./props";
// import Test from "./test";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path="/detail" element={<Detail />} />
                <Route path="/test" element={<Test />} /> */}
            {/* 여기부턴 용준님거 */}
            <Route path="/detail" element={<Detail />} />
        </Routes>
    );
};

export default Router;
