import React, { useState, useEffect } from "react";
import axios from "axios";
import { idText } from "typescript";
import "./components/css/table.css";

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
  const [kospiData, setKospiData] = useState([]);
  const [kosdaqData, setKosdaqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* api 받는 함수 */
  const FetchDatas = async () => {
    try {
      //요청 초기화
      setError(null);
      setLoading(true);
      setKospiData([]);

      //서버 접속 후 DB연결
      // kospi
      const kospiRes:any = await axios.get<Object>("http://127.0.0.1:8080/table_data_kospi"); 
      setKospiData(kospiRes.data);
      // kosdaq
      const kosdaqRes:any = await axios.get<Object>("http://127.0.0.1:8080/table_data_kosdaq"); 
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


  const datas2 = kosdaqData.map<Ko>(item => item[0]).map(item => {
    return item['종목명']
  })
  // console.log(datas2)
  return (
    <div id="section">
      <div className="tables">
        <div className="kospiSection">
          <div className="marketName">
          <h3>KOSPI</h3>
          </div>
            <div className="rows">
              <span>1</span>
              <span>종목명</span>
              <span>등락가</span>
              <span>등락율</span>
              <span>현재가격</span>
            </div>
        </div>
        <div className="kosdaqSection">
          <div className="marketName">
          <h3>KOSDAQ</h3>
          </div>
            <div className="rows">
              <span>1</span>
              <span>종목명</span>
              <span>등락가</span>
              <span>등락율</span>
              <span>현재가격</span>
            </div>
        </div>
      </div>
        {/* <div className="kospi">
            { kospiData.map<Ko>(item => item[0]).map(item => {
              return (
                <li>{item['종목명']} {item['등락가']} {item['등락율']} {item['종가']} {item['날짜']}</li>
              )
            })}
        </div> */}
        {/* <div className="kosdaq">
            { kosdaqData.map<Ko>(item => item[0]).map(item => {
              return (
                <li>{item['종목명']} {item['등락가']} {item['등락율']} {item['종가']} {item['날짜']}</li>
              )
            })}
        </div> */}
    </div>
  );
}

export default App;
