import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import { off } from "process";
// import { render } from "@testing-library/react";
// import Table from "./Table_main";

//db 끌고옴
interface Ko {
    code: string;
    날짜: string;
    등락가: number;
    등락율: string;
    종가: number;
    종목명: string;
    // item : string
}

const Bar = ({ onSubmit }: any) => {
    const [kospiData, setKospiData] = useState([]);
    const [kosdaqData, setKosdaqData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tler, settler] = useState("");


    /* api 받는 함수 */
    const FetchDatas = async () => {
        try {
            //요청 초기화
            setError(null);
            setLoading(true);
            // setKospiData([]);

            //서버 접속 후 DB연결
            // kospi
            const kospiRes: any = await axios.get<Object>(
                "http://127.0.0.1:8080/table_data_kospi"
            );
            setKospiData(kospiRes.data);
            // kosdaq
            const kosdaqRes: any = await axios.get<Object>(
                "http://127.0.0.1:8080/table_data_kosdaq"
            );

            setKosdaqData(kosdaqRes.data);

            console.log("fetch datas");
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        FetchDatas();
    }, []);
    // ------------------------------------------
    const [getpush, setpush] = useState("");
    const [txValue, setTextValue] = useState("");

    // const [ senddate, setData] =useState("");
    // setData("하이")

    //종목명
    const kosdaqname = kosdaqData.map<Ko>((item) => item[0]["종목명"]);
    const kosipe = kospiData.map<Ko>((item) => item[0]["종목명"]);

    //input에 누르면 값저장



    //💛 버튼이 누르면 input 값이랑 companyname이랑 비교
    function setDealTab(data: string) {
        setpush(data);
        console.log(getpush);

        if (getpush === "pressed") {
            //input 값이랑 companyname이랑 비교
            let filter_kosdaq_Data: any = kosdaqname.filter((i: any) => {
                // return i === data
                return i.includes(txValue);
            });

            let filter_kospi_Data: any = kosipe.filter((i: any) => {
                return i.includes(txValue);
            });
            settler(filter_kosdaq_Data);
            settler(filter_kospi_Data);
            console.log(filter_kosdaq_Data);
            console.log(filter_kospi_Data);

            // undifined
            if (txValue.length === 0) {
                filter_kosdaq_Data = [];
                filter_kospi_Data = [];
            }
        }
    }

    // ----------------------- return---------------------------------------
    return (
        <div className="header">
            <form onSubmit={onSubmit}>
                <input className="input" />

                <button className="search">
                    <span>검색</span>
                </button>
            </form>
        </div>
    );
};

export default Bar;
