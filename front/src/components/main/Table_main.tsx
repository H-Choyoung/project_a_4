import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading"
import "../css/table.css";
import {RankStyle} from "./Table_rank_style"
interface Ko {
  'code': string;
  '날짜': string;
  '등락가': number;
  '등락율': string;
  '종가': number;
  '종목명': string;
  // sort: any[];
}

function Table(){
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  //itemlist
  const [kospiData, setKospiData] = useState([]);
  const [kosdaqData, setKosdaqData] = useState([]);
  // target(관찰대상)
  const [target, setTarget] = useState(null);

  // 데이터 페칭 함수
  let page:number = 1;
  const FetchData = async()=> {
    // kospi
    const kospiRes:any = await axios.get<Object>("http://127.0.0.1:8080/table_data_kospi"); 
    setKospiData((prev) => prev.concat(kospiRes.data));
    // kosdaq
    const kosdaqRes:any = await axios.get<Object>("http://127.0.0.1:8080/table_data_kosdaq"); 
    setKosdaqData((prev) => prev.concat(kosdaqRes.data));
    page++;
  }
  
  // useEffect(() => {
  //   FetchData();
  // }, []);
  
  /* 스크롤용 IntersectionObserver */
  //target변경이 감지될 시 useEffect실행 
  useEffect(()=> {
    let observer:any;
    if(target){
      //콜백함수 
      const onIntersect = async([entry]:any, observer:any) => {
        // 교차 상태가 true일때 데이터페칭
        if(entry.isIntersecting && !loading){
          observer.unobserve(entry.target);
          setLoading(true);
          // await new Promise((resolve) => setTimeout(resolve, 2000));
          await FetchData();
          // setTimeout(() => FetchData(),2000);
          setLoading(false);
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, {threshold:1});
      observer.observe(target);
    };
    return ()=> observer && observer.disconnect();
  }, [target]);

  
  /* market데이터 가져와서 우선 정렬하는 함수 */
  //1. 마켓 데이터 가져오기(sortData함수에 넣으면 안됨)
  const getKospi = kospiData.map<Ko>(item => item[0]);
  const getKosdaq = kosdaqData.map<Ko>(item => item[0]);
  //2. 가져온 데이터 정렬
  const sortData =(objs:any[])=> {
    let sort = objs.sort((a:any,b:any)=> 
      b["등락율"] - a["등락율"]
      );
      // console.log(sort);
      return sort;
    }
  //3. 정렬된 배열 변수에 담기(리턴에서 사용)
  const sortKospi = sortData(getKospi);
  const sortKosdak = sortData(getKosdaq);
      

  return (
    <div id="section">
      <div className="tables">
        <div className="kospiSection">
          <div className="marketName">
          <h3>KOSPI</h3>
          </div>
          <div className="rowsContainer">
              { sortKospi.map((item, idx) => {
                  return (
                    <RankStyle 
                    idx={idx+1}
                    name={item["종목명"]}
                    riseNfall={item["등락가"]}
                    riseNfallPer={item["등락율"]}
                    close={item["종가"]}
                    />
                    )}
                )}
              {loading ?(
              <>
              <ReactLoading type="bars" color="#D7FF38" />
              </>
            ):("")}
            <div ref={(e:any) => setTarget(e)}></div>
          </div>
        </div>
        <div className="kosdaqSection">
          <div className="marketName">
          <h3>KOSDAQ</h3>
          </div>
          <div className="rowsContainer">
          { sortKosdak.map((item, idx) => {
              return (
                <RankStyle 
                idx={idx+1}
                name={item["종목명"]}
                riseNfall={item["등락가"]}
                riseNfallPer={item["등락율"]}
                close={item["종가"]}
                />
                )}
              )}
              {loading ?(
              <>
              <ReactLoading type="bars" color="#D7FF38" />
              </>
            ):("")}
            <div ref={(e:any) => setTarget(e)}></div>        
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;