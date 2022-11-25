import React, { useState, useEffect } from "react";
import Table from "./components/main/Table_main";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Table />}></Route>
                <Route path="/Table_main" element={<Table />}></Route>
            </Routes>
        </>
    );
}

export default App;
