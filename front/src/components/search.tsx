import axios, { Axios } from "axios";
import { stringify } from "querystring";
import{ Routes,Route,Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { idText,getAllJSDocTags } from "typescript";


//db 끌고옴 
interface Ko {
  'code': string;
  '날짜': string;
  '등락가': number;
  '등락율': string;
  '종가': number;
  '종목명': string;
  // item : string
}

function Bar(){
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


 const datas2 = kosdaqData.map<Ko>(item => item[0]['종목명'])
  
  //종목명 
   console.log(datas2)

//   ------------ 추가 ------------------ 

interface value{
    company: string; 
  };

const SearchBar = () =>{
    const [txValue, setTextValue] = useState(""); 
     
   
    //input 값 useState에 넣어주기 
    const onInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
     setTextValue(e.target.value)
    }
    //버튼 클릭시 input 값 가져오기 
    const onclick = (e:React.MouseEvent<HTMLButtonElement ,MouseEvent>) => {
    // alert(txValue);
    // let name:string = txValue;
     console.log(txValue)
    };  
    
    const filteredcomponets = (data: object[]) =>{ 
        //    item.name.include 
        
          const searchtext = data.filter((value: any) => {    
            if(value === txValue){
                console.log(value)
            }    
        }
     )}  
    
     filteredcomponets(datas2)
  
     return ( 
 
        <div className="header">
          {/* <form onSubmit={(e) =>sendForm(e)}> */}
        <input className="iptSearch" id="keyword" value ={txValue} onChange={onInput}/>
        <button className="search" onClick={onclick} >
        <span>검색</span> 
        </button>
        {/* </form> */}
        {/* <p>{txValue}</p> */}
    </div>  
  
  
        );

} 
SearchBar();






}
  export default Bar;
