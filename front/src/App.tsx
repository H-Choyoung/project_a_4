import React, { useState, useEffect } from "react";
import "./components/css/App.css";
import Article from "components/screens/Article";
import axios from "axios";
import ArticleNew from "components/screens/ArticleNew";
import { BiSearch } from "react-icons/bi";
import Realtedsearch from "components/screens/Realtedsearch";
import { useNavigate, useNavigation } from "react-router-dom";
import Router from "router";
import Table from "components/main/Table_main";
import moneyBird from "./img/moneyBird.png"

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

interface Proptypes {
    data: Item[];
}

interface GetDb {
    name: string;
}

interface DB {
    company: GetDb[];
}

function App() {
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
    const [title, setTitle] = useState<string>("");
    // const [title, setTitle] = useState<string>("")
    // const onInput = (e:any) : void => {
    //   // console.log(e)
    // }
    const [getName, setGetName] = useState<any>({
        company: [],
    });

    interface Data {
        name: string;
    }

    // const [data, setData] = useState<st>

    const [search, setSearch] = useState<any>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getDatas = async () => {
            const datas = await axios.get(`http://127.0.0.1:8080/${title}`);
            // console.log(datas.data.name[0].name)
            setCount(datas.data.sim);
            // console.log(count)
            setCountNew(datas.data.date);
            // console.log(countNew)
            setGetName(datas.data.name);

            console.log(datas.data.name);
            // console.log(datas.data.sim.items)
        };
        getDatas();
    }, []); 

    const [searchName, getname] = useState("");
    function setDealTab(data:any){ 
        getname(data)
        

    }

    // console.log(getName)
    return (
        // ??????
        <div className="root">
            {/* ???????????? ???????????? */}
            <div className="mainContainer">
                {/* ?????? ???????????? */}
                <div className="searchArea">
                    <img className="logo" src={moneyBird}></img>
                    <p id="name">?????? ???????????? ???????????????</p>
                    <div className="serachContainer">
                        <BiSearch size={24} className="searchIcon" />
                        <form
                            className="form"
                            onSubmit={async (e: any) => {
                                // console.log(e.target[0].value)
                                e.preventDefault();
                                const input = await axios.get(
                                    `http://127.0.0.1:8080/${title}`
                                );
                                // console.log(input.data)
                                setCount(input.data.sim);
                                setCountNew(input.data.date);
                                setSearch([]);
                                // console.log(e.target[0].value)
                                // console.log(title)
                                let searchFilter = getName.filter((i: any) => {
                                    return i.name.includes(e.target[0].value);
                                });

                                if (
                                    e.target[0].value === searchFilter[0].name
                                ) {
                                    // navigate(
                                    //     `/detail?market=${searchFilter[0].name}`
                                    // ); 
                                    // ???????????? ???????????? 
                                    // navigate(
                                    //     `/detail?market=${searchFilter[0].market.toLowerCase()}&code=${
                                    //         searchFilter[0].code
                                    //     }&company=${
                                    //         searchFilter[0].name
                                    //     }&day=month`
                                    // );
                                }
                            }}
                        >
                            <input
                                autoComplete="off"
                                // value={search}
                                className="input"
                                // onKeyDown={(e) => {
                                //     console.log(e.code);
                                // }}
                                onChange={(e) => {
                                    let data = e.target.value;

                                    setTitle(data);
                                    // console.log(getName);
                                    let filterData = getName.filter(
                                        (i: any) => {
                                            return i.name.includes(data);
                                        }
                                    );
                                    if (data.length === 0) {
                                        filterData = [];
                                    }

                                    // console.log(filterData)
                                    setSearch(filterData);
                                }}
                                type="text"
                                placeholder="?????? ??????"
                                id="id"
                            ></input>
                            <div className="resultContainer">
                                {search.map((item: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <div
                                                className="searchResult"
                                                onClick={() => {
                                                    navigate(
                                                        `/detail?market=${item.market.toLowerCase()}&code=${
                                                            item.code
                                                        }&company=${
                                                            item.name
                                                        }&day=month`
                                                    );
                                                    return setSearch([]);
                                                }}
                                            >
                                                <p
                                                    className="searchResultValue"
                                                    // onClick={()=> setSearch([])}
                                                >
                                                    {item.name}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button onClick={() => setDealTab({title})}  className="inputButton">????????????</button>
                        </form>
                    </div>
                </div>

                {/* ????????? ???????????? */}
                <div className="tableContainer">
                    {/* ????????? */}
                    <div className="stockInfoTitle">
                        {/* <p>?????? ????????? ??????</p> */}
                        <p>?????? ????????? ??????(22.02.03 ??????)</p>
                    </div>
                    {/* ??????????????? */}
                    <div className="tableArea">
                        <Table test={searchName} />
                        {/* <p>????????? ????????????</p> */}
                    </div>
                </div>
            </div>
            {/* ??????????????? ???????????? */}
            <div>
                {/* ?????? */}
                <div className="title">
                    <p className="newsTitle1">{title} </p>
                    <p className="newsTitle2">??????????????????</p>
                </div>

                <div className="container">
                    <p className="detailTitle">????????? ?????? ??????</p>
                    <div className="articleContainer">
                        <Article data={count} />
                    </div>
                </div>
                <div className="container">
                    <p className="detailTitle">?????? ??????</p>
                    <div className="articleContainer">
                        <ArticleNew data={countNew} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
