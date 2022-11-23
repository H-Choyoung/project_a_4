import React from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Test() {
  
  const navigate = useNavigate()
  const [searchParams, setSearchParams] =  useSearchParams();
  const detail = searchParams.get('detail');
  const mode = searchParams.get('mode');

  const location = useLocation();      
  const params = useParams();
  console.log(params)                         
  
  return (
    <div>
      <div 
      onClick={()=> {
        navigate(-1)
      }}
      style={{width:'50px', height : '50px', backgroundColor : "salmon" }}>back
      </div>
      <p>쿼리스트링</p>
      <p>{location.search}</p>
    </div>

  )
}

export default Test