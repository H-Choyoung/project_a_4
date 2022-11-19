import{ Routes,Route,Link} from "react-router-dom";
import './components/css/App.css';
import SearchBar from './components/pages/search';
import DrawTable from './components/pages/getTable'; 
import React ,{useEffect,useState} from "react"; 


import axios from 'axios';
import { count } from "console";

interface company {
  code:string,
  name:string,
  market:string
  
}  

// let comp : company;

function App() { 
  const [Data, setData] = useState([]);
   
  const fatchDatas = async() => {
    try{
       setData([]); 
      const res = await axios.get("http://127.0.0.1:5000/company");
      console.log("feach datas!!") 
      setData(res.data); // useState 변수에 담긴다
      //  console.log(Data)
      console.log("hi")

    } catch(e){
      console.log(e)
    }
  }; 
  

  useEffect(() => {
   fatchDatas();
  }, []);

   console.log(Data)
  // const test = Data;
  // const test2 = test.map(i,item => item[0])




  return (
    <div className="App">
      <div>
      <Link to="/SearchBar">SearchBar</Link>
      </div>

       <div>
        <table>
        <thead>
          <tr>
            <td>나이</td>
            <td>코드</td>
            <td>마켓</td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td> {Data.map((i:company)=>{
            return(
              <p>{i.name}</p>
              
            )
          })}</td>
          <td>
          {Data.map((i:company)=>{
            return(
              <p>{i.code}</p>
              
            )
          })}
          </td>
          <td> {Data.map((i:company)=>{
            return(
              <p>{i.market}</p>
              
            )
          })}</td>
        </tr>

        </tbody>

        </table>
        
    
       </div>

      <div>       
          <Routes>
            <Route path='/SearchBar' element={<SearchBar/>}></Route>
          </Routes>   
          <Routes>
          <Route path='/getTable' element={<DrawTable/>}></Route>
          </Routes>   
         
      </div>
    </div>
  );
}

export default App;
