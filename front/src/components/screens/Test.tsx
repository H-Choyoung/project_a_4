import React from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Test() {
  
  const navigate = useNavigate()
  const [searchParams, setSearchParams] =  useSearchParams();
  const detail = searchParams.get('detail');
  const mode = searchParams.get('mode');

  const location = useLocation(); 
  // const decodeUri = decodeURI(HISTORY.location?.search)
  const params = useParams();
  console.log(params.test)

  const test = decodeURI(location?.search)
  console.log(test)                         
  
  return (
    <div>
      <div 
      onClick={()=> {
        navigate(-1)
      }}
      style={{width:'50px', height : '50px', backgroundColor : "salmon" }}>back
      </div>
      <p>선택된 종목</p>
      <h1>{params.name}</h1>
    </div>

  )
}

export default Test