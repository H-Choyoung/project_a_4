import React, {useState} from "react";


const SearchBar = () =>{
    const [txValue, setTextValue] = useState(""); 

    const onInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
     setTextValue(e.target.value)
    }

    const onclick = (e:React.MouseEvent<HTMLButtonElement ,MouseEvent>) => {
    alert(txValue);
    // let name:string = txValue;
    console.log(txValue)
    }; 
    
    

    


// 검색 마크업

    return (
      <div className="header">
      <input type="text" className="iptSearch" id="keyword" value={txValue} onChange={onInput}/>
      <button type="button" className="search" onClick={onclick} >
          <span>검색</span>
      </button>

      <p>{txValue}</p>
  </div>
      );
  
}


export default SearchBar;
