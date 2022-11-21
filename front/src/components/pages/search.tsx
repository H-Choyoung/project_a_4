import axios, { Axios } from "axios";
import { stringify } from "querystring";
import React, {useState} from "react";

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
    
    const url ="http://localhost:5000/value "
   async function submit(e: any){
        console.log(e)
         e.preventDefault(); 
       await axios.get( `localhost:5000/value/${txValue}`
        ).then(response => {
            console.log(response)
        })
    }
    
    //⭐feach방식으로 post
//     const sendValue = () => {
//     console.log("하이하이")
//     fetch('http://127.0.0.1:5000/value',{
//         method:"POST", 
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({ 
//             txValue
//         }),
        
//     }).then(res => {
//         if(res.ok){
//             alert("생성이 완료되었습니다")
//         }
//     })

//   }
//   sendValue()

    //⭐xios 방식으로 post 
        // console.log("바이") 
        // axios.post('http://127.0.0.1:5000/value',{
        //      txValue
        // }).then(function (respose){
        //   console.log("보냄");
        // }).catch(function name(error) {
        //     console.log(error)
        // })
    

    

// 검색 마크업

    return ( 
 
      <div className="header">
        <form onSubmit={(e) =>submit(e)}>
      <input className="iptSearch" id="keyword" value ={txValue} onChange={onInput}/>
      <button className="search" onClick={onclick} >
           <span>검색</span> 
      </button>
      </form>
      {/* <p>{txValue}</p> */}
  </div>
 
      );
  
}


export default SearchBar;
