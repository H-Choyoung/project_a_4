import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import "./components/css/detail.css";
import { ApexOptions } from "apexcharts";

interface Data {
    close: string;
    day: string;
    high: string;
    low: string;
    no: string;
    open: string;
    volume: string;
}

const Detail = () => {
    const { search } = useLocation();
    const [count, setCount] = useState<Data[]>([]);
    const [options, setOptions] = useState<ApexOptions>({
        chart: {
            type: "candlestick",
            height: 350,
        },
        title: {
            text: "CandleStick Chart",
            align: "left",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    });
    const [series, setSeries] = useState([
        {
            data: [
                {
                    x: new Date(1538778600000),
                    y: [6629.81, 6650.5, 6623.04, 6633.33],
                },
                {
                    x: new Date(1538780400000),
                    y: [6632.01, 6643.59, 6620, 6630.11],
                },
            ],
        },
    ]);

    useEffect(() => {
        const getData = async () => {
            const company: any = await axios.get<Object>(
                `http://localhost:8080/detail${search}`
            );
            console.log(company.data);
            setCount(company.data);
        };
        getData();
    }, []);

    return (
        <div className="detail">
            <div className="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="candlestick"
                />
            </div>
        </div>
    );
};

export default Detail;
