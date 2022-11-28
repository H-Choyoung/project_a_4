import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import "../css/detail.css";
import { ApexOptions } from "apexcharts";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Article from "./Article";
import ArticleNew from "./ArticleNew";
import Reccomm from "./Reccommend";

export interface Item {
    description: string;
    link: string;
    originallink: string;
    pubDate: string;
    title: string;
}

export interface RootObject {
    display: number;
    items: Item[];
    lastBuildDate: string;
    start: number;
    total: number;
}

interface info {
    rate: number;
    prev_day_price: number;
    today_price: number;
}

const Detail = () => {
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loging, setLoging] = useState<Boolean>(true);
    const [info, setInfo] = useState<info>({
        rate: 0,
        prev_day_price: 0,
        today_price: 0,
    });
    const navigate = useNavigate();
    // const [count, setCount] = useState<any>([]);
    const [options, setOptions] = useState<ApexOptions>({
        chart: {
            type: "candlestick",
            height: 350,
        },
        title: {
            text: "",
            align: "left",
        },
        xaxis: {
            type: "datetime",
            // type: "category",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
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

    const [count, setCount] = useState<RootObject>({
        display: 1,
        items: [],
        lastBuildDate: "",
        start: 1,
        total: 1,
    });

    const [countNew, setCountNew] = useState<RootObject>({
        display: 1,
        items: [],
        lastBuildDate: "",
        start: 1,
        total: 1,
    });

    useEffect(() => {
        // 그래프
        const getData = async () => {
            const company: any = await axios.get<Object>(
                `http://localhost:8080/detail${search}`
            );

            const { data, prev_day_price, rate, today_price } = company.data;

            setSeries(() => [
                {
                    data: data,
                },
            ]);

            setInfo({
                prev_day_price,
                rate,
                today_price,
            });

            setLoging(false);
        };

        // 뉴스
        const getNews = async () => {
            const companyName: string | null = searchParams.get("company");
            const datas = await axios.get(
                `http://localhost:8080/${companyName}`
            );
            setCount(datas.data.sim);
            setCountNew(datas.data.date);
        };

        getData();
        getNews();
    }, []);

    const onclickDayHandler = async (text: any) => {
        let save: any = searchParams.get("day");
        let urlChange = window.location.search.replace(save, text);

        const getDay: any = await axios.get<Object>(
            `http://localhost:8080/detail${urlChange}`
        );

        const { data, prev_day_price, rate, today_price } = getDay.data;
        setSeries([
            {
                data: data,
            },
        ]);

        setInfo({
            prev_day_price,
            rate,
            today_price,
        });
        navigate(urlChange);
    };

    return (
        <div className="detail">
            {loging ? (
                <div>로딩중 입니다 잠시만 기다려주세요</div>
            ) : (
                <>
                    <div className="root">
                        {/* 검정배경 메인영역 */}
                        <div className="mainContainer">
                            <div className="section">
                                <div className="wrapArrow">
                                    <div>
                                        <FaLongArrowAltLeft
                                            size={48}
                                            cursor={"pointer"}
                                            onClick={() => {
                                                navigate("/");
                                            }}
                                        />
                                        <p>{searchParams.get("company")}</p>
                                    </div>

                                    <div className="search">
                                        <input
                                            type="text"
                                            placeholder="검색어 입력"
                                        />
                                        <AiOutlineSearch
                                            size={24}
                                            cursor={"pointer"}
                                        />
                                    </div>
                                </div>
                                <div className="chart">
                                    <ReactApexChart
                                        options={options}
                                        series={series}
                                        type="candlestick"
                                    />
                                </div>
                                <div className="info">
                                    <div>
                                        <label>등락율:</label>
                                        <div className="font_color_red font_weight_700">
                                            {info.rate}%
                                        </div>
                                    </div>
                                    <div>
                                        <label>전일대비:</label>
                                        <div className="font_color_red font_weight_700">
                                            {info.prev_day_price}원
                                        </div>
                                    </div>
                                    <div>
                                        <label>현재가격:</label>
                                        <div className="font_weight_700">
                                            {info.today_price}원
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_wrap">
                                    <button
                                        className="btn font_weight_700 font_size_18"
                                        onClick={() =>
                                            onclickDayHandler("month")
                                        }
                                    >
                                        1개월
                                    </button>
                                    <button
                                        className="btn font_weight_700 font_size_18"
                                        onClick={() =>
                                            onclickDayHandler("year")
                                        }
                                    >
                                        1년
                                    </button>
                                </div>
                                <Reccomm data={info.rate} />
                                {/* <div className="recommend">
                                    <button>매수 적극 추천</button>
                                </div> */}
                            </div>
                        </div>
                        {/* 뉴스페이지 컨테이너 */}
                        <div>
                            {/* 제목 */}
                            <div className="title">
                                <p className="newsTitle1">
                                    {searchParams.get("company")}
                                </p>
                                <p className="newsTitle2">관련뉴스예요</p>
                            </div>
                            {/* 관련도 높은순 뉴스 */}
                            <div className="container">
                                <p className="detailTitle">관련도 높은 뉴스</p>
                                <div className="articleContainer">
                                    <Article data={count} />
                                </div>
                            </div>

                            {/* 최신순 뉴스 */}
                            <div className="container">
                                <p className="detailTitle">최신 뉴스</p>
                                <div className="articleContainer">
                                    <ArticleNew data={countNew} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Detail;
