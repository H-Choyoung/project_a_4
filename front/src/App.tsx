import React, { useState, useEffect } from "react";
import axios from "axios";
import { idText } from "typescript";

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
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* api 받는 함수 */
  const FetchDatas = async () => {
    try {
      //요청 초기화
      setError(null);
      setLoading(true);
      // setDbData([]);
      //서버 접속 후 DB연결
      const res:any = await axios.get<Object>("http://127.0.0.1:5000/table_rate_m_kospi"); 
      setDbData(res.data);
      console.log("fetch datas");
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    FetchDatas();
  }, []);

  const datas = dbData.map<Ko>(item => {
    // console.log(item.code)
    return item[0]
  });
  // console.log(datas)
  // console.log(datas[0]['날짜'])

  const datas2 = dbData.map<Ko>(item => item[0]).map(item => {
    return item.code
  })
  console.log(datas2)


  // const datas2 = datas.map((item, idx) => {
  //   console.log(item.code)
  //   console.log(idx)
  //   // return item.code
  // });
  // console.log(datas2)




  return (
    <div className="App">
        {/* {datas.filter((item:Ko, idx:number) => {
          if(item['날짜'] === "Mon, 03 Jan 2022 00:00:00 GMT"){
            return (
              <p key={idx}> {item.code} </p>
            )}}
          )}; */}
        { dbData.map<Ko>(item => item[0]).map(item => {
          return (
            <p>{item['종목명']}</p>
          )
        })}
    </div>
  );
}

export default App;
