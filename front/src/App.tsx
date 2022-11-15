import React, { useEffect } from "react";
import axios from "axios";
import "./components/css/App.css";

function App() {
    useEffect(() => {
        const getData = async () => {
            const company = await axios.get("http://localhost:8080/search");
            console.log(company.data);
        };
        getData();
    }, []);

    return (
        <div className="App">
            <div>asd</div>
            <div>asd</div>
        </div>
    );
}

export default App;
