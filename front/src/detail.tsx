import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";

const Detail = () => {
    const { search } = useLocation();

    useEffect(() => {
        console.log(search);
        const getData = async () => {
            const company: any = await axios.get<Object>(
                `http://localhost:8080/detail${search}`
            );
            console.log(company);
        };
        getData();
    }, []);

    return <div>dasdasd</div>;
};

export default Detail;
