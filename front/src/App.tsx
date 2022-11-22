import React, { useState, useEffect } from "react";
import axios from "axios";
// import { idText } from "typescript";
import ReactLoading from "react-loading"
import "./components/css/table.css";
import {RankStyle, RankStyleFont, RankStyleFontNum} from "./components/main/RankStyle"
interface Ko {
  'code': string;
  '날짜': string;
  '등락가': number;
  '등락율': string;
  '종가': number;
  '종목명': string;
  // item : string
}

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  //테스트용
  const datas2 = kospiData.map<Ko>(item => item[0]).map(item => {
    if (typeof item["등락율"] === 'string'){
      // console.log(item["등락율"] === '0.0000');
    }
  })

  return (
    <div id="section">
      <div className="tables">
        <div className="kospiSection">
          <div className="marketName">
          <h3>KOSPI</h3>
          </div>
          <div className="rowsContainer">
            { kospiData.map<Ko>(item => item[0]).map((item, idx) => {
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
          { kosdaqData.map<Ko>(item => item[0]).map((item, idx) => {
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

export default App;
