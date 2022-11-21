import axios, { Axios } from "axios";
import { stringify } from "querystring";
import React, {useEffect, useState} from "react";
import { getAllJSDocTags } from "typescript";

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
 
    



  //axios 
//    async function submit(e: any){
//         console.log("하이")
//           e.preventDefault(); 
//        await axios.get( `localhost:5000/value/${txValue}`
//         ).then(response => {
//             console.log(response)
//             console.log(txValue)
//         })
//     }
    
interface a{
    company: ""
}
  const sendForm = async(e: React.FormEvent<HTMLFormElement>)=> {

    e.preventDefault()

    const {keyword} = e.target as typeof e.target &{
        keyword:{value: string}
    } 
      
    console.log(keyword.value)
    
   const getData = await fetch('http://127.0.0.1:5000/value',{ 
        headers:{
            'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
            company:keyword.value
            
        })
    })
    
    console.log(getData)

   
    
  }

    

// 검색 마크업

    return ( 
 
      <div className="header">
        <form onSubmit={(e) =>sendForm(e)}>
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
