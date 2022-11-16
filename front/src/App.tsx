import React, { useState, useEffect } from "react";
import axios from "axios";
// import './components/css/App.css';
// import './components/main/table/table.tsx'

function App() {
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // interface types{
  //   e:any
  // }

  /* api 받는 함수 */
  const FetchDatas = async () => {
    try {
      //요청 초기화
      setError(null);
      setLoading(true);
      setDbData([]);
      
      //서버 접속 후 DB연결
      const res = await axios.get("http://127.0.0.1:5000/table_220203_m"); 
      setDbData(res.data);
      // console.log(res.data);
      console.log("fetch datas");
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    FetchDatas();
  }, []);
  //데이터 배열 전체 추출
  const test = dbData;
  const test2 = test.map(item => item[0])
  console.log(test2);
  return (
    <>
    </>
  );
}

export default App;
