import React, { useState, useEffect } from "react";
import{ Routes,Route,Link} from "react-router-dom";
import Bar from './components/search';
import axios from "axios";
import { idText,getAllJSDocTags, createSolutionBuilderHost } from "typescript";
import "./components/css/table.css"; 
import { off } from "process";



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
 interface value{
    company: string; 
  };
  




const App = () =>{ 

  
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
      // setKospiData([]);

      //서버 접속 후 DB연결
      // kospi
      const kospiRes:any = await axios.get<Object>("http://127.0.0.1:8080/table_data_kospi");
      setKospiData(kospiRes.data);
      // kosdaq
      const kosdaqRes:any = await axios.get<Object>("http://127.0.0.1:8080/table_data_kosdaq");
      console.log(kosdaqRes) 
      setKosdaqData(kosdaqRes.data);

      // console.log("fetch datas");
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    FetchDatas();
  }, []);

 //종목명 
   const kosdaqname = kosdaqData.map<Ko>(item => item[0]['종목명'])  
   const kosipe = kospiData.map<Ko>(item => item[0]['종목명']) 
  console.log(kosdaqname)
  console.log(kosipe)

   


  //  -----------------------------------------------------------------

     
   // input 넣자마자 
    const [txValue, setTextValue] = useState(""); 
    //button 누르면 
    const [getValue, setPushValue] = useState("");
     
    
    //input 값 useState에 넣어주기 
    // const onInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
    //  setTextValue(e.target.value)
    //  }

    //버튼 클릭시 input 값 가져오기 
    const onclick = (e:React.MouseEvent<HTMLButtonElement>) => {
    //  let name:string = txValue;
          // console.log(txValue)
    };   

    
    //filter 기능 
    // let filterData = kosdaqname.filter((i: any) => {
     

    //  const filteredComponents = () => { 
    //    let data = kosdaqname.filter((i: any) => { 
    //     return i.name.includes(txValue) 
    //     console.log("gggggggggggggggg")
    //     console.log(txValue)
        
       
    //    }) 
    //    console.log(data)
    //  } 

    //  filteredComponents()

     return ( 
        <div className="header">
          {/* <form onSubmit={(e) =>sendForm(e)}> */}
        {/* <input className="iptSearch" id="keyword" value ={txValue} onChange={onInput}/>  */}

        <input className="input" onChange={(e)=> {
          let data = e.target.value 
          console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz") 
          let filterData = kosdaqname.filter((i:any) => {
            // return i === data
            return i.includes(data)
          })
          console.log(filterData)

          if(data.length === 0){
            filterData =[];
          }

        }}/>

        <button className="search" onClick={onclick} > 
        <span>검색</span> 
        </button>
        {/* </form> */}
        {/* <p>{txValue}</p> */}
    </div>  
        )

       
      
}


export default App;
