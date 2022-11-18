import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import "./components/css/detail.css";
import { ApexOptions } from "apexcharts";

interface Data {
    close: string;
    day: Date;
    high: string;
    low: string;
    // no: string;
    open: string;
    // volume: string;
}

const Detail = () => {
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loging, setLoging] = useState<Boolean>(true);
    // const [count, setCount] = useState<any>([]);
    const [options, setOptions] = useState<ApexOptions>({
        chart: {
            type: "candlestick",
            height: 350,
        },
        title: {
            text: `${searchParams.get("company")}`,
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
        noData: {
            text: "loging",
        },
    });
    const [series, setSeries] = useState<any>([
        {
            data: [
                [],
                [],
                // {
                //     x: new Date(2016, 1, 1),
                //     y: [6629.81, 6650.5, 6623.04, 6633.33],
                // },
                // {
                //     x: new Date(2016, 2, 5),
                //     y: [6632.01, 6643.59, 6620, 6630.11],
                // },
            ],
        },
    ]);
    useEffect(() => {
        const getData = async () => {
            const company: any = await axios.get<Object>(
                `http://localhost:8080/detail${search}`
            );

            setSeries(() => [
                {
                    data: company.data,
                },
            ]);

            setLoging(false);
        };
        getData();
    }, []);

    return (
        <div className="detail">
            {loging ? (
                <div>로딩중 입니다 잠시만 기다려주세요</div>
            ) : (
                <div className="section">
                    <div className="chart">
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="candlestick"
                        />
                    </div>
                    <div className="btn_wrap">
                        <button className="btn">1개월</button>
                        <button className="btn">1년</button>
                    </div>
                    <div></div>
                    <div className="info">
                        <div>동락율</div>
                        <div>전일대비</div>
                        <div>현재가격</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;
