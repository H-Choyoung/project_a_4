import React, { useEffect, useState } from "react";
import axios from "axios";
import "./components/css/detail.css";
import { Data } from "App";

const Props = () =>
    // { data }: { data: Data }

    {
        // console.log(data);
        return (
            <div>
                <form
                    method="get"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const test: any = await axios.get<Object>(
                            "http://localhost:8080/test"
                        );
                        console.log(test);
                    }}
                >
                    <input type="text" />
                    <button>전송</button>
                </form>
            </div>
        );
    };

export default Props;
