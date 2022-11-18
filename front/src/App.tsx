import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./components/css/App.css";
import Props from "./props";

interface Ko {
    code: string;
    flotationNY: string;
    market: string;
    name: string;
    no: string;
    realSearch: string;
    startday: string;
}

export interface Data {
    kosdak: Ko[];
    kospi: Ko[];
}

function App() {
    const navigate = useNavigate();
    const [count, setCount] = useState<Data>({
        kosdak: [],
        kospi: [],
    });

    const kosdakClick = (ko: Ko) => {
        navigate(
            `/detail?market=${ko.market.toLowerCase()}&code=${
                ko.code
            }&company=${ko.name}`
        );
    };

    useEffect(() => {
        const getData = async () => {
            const company: any = await axios.get<Object>(
                "http://localhost:8080/index"
            );
            setCount(company.data);

            console.log(company);
        };
        getData();
    }, []);

    return (
        <div className="App">
            <div>
                {count.kosdak.map((el: Ko, i: number) => {
                    return (
                        <p key={i} onClick={() => kosdakClick(el)}>
                            {el.name}
                        </p>
                    );
                })}
            </div>

            <div>
                {count.kospi.map((el: Ko, i: number) => {
                    return (
                        <p key={i} onClick={() => kosdakClick(el)}>
                            {el.name}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
