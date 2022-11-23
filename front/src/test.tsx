import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import "./components/css/detail.css";
import { Data } from "App";

let obj = {};

const Test = () => {
    const [test, setTest] = useState<any>("test");
    const [count, setCount] = useState<any>("count");
    // { data }: { data: Data }

    useEffect(() => {
        setTimeout(() => {
            setCount("count 변경");
        }, 2000);
    }, []);

    console.log(test);
    console.log(count);

    return (
        <>
            <div>{test}</div>
            <div>{count}</div>

            <div>
                <p>호이</p>
            </div>
            {console.log("a")}
        </>
    );
};

export default Test;
