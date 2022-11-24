import React, { useState, useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import '../css/Detail.css'
import Article from './Article';
import ArticleNew from './ArticleNew';
import { RootObject } from 'App';
import axios from 'axios';

function Detail() {

  useEffect(()=> {
    const getDatas = async () => {
      const datas = await axios.get(
        `http://127.0.0.1:8080/${params.name}`
        )
      setCount(datas.data.sim)
      setCountNew(datas.data.date)
    }
    getDatas()
    
  },[])
  
  const [count, setCount] = useState<RootObject>({
    display: 1,
    items: [],
    lastBuildDate: "",
    start: 1,
    total: 1
  })

  const [countNew, setCountNew] = useState<RootObject>({
    display: 1,
    items: [],
    lastBuildDate: "",
    start: 1,
    total: 1
  })

  const navigate = useNavigate()
  const [searchParams, setSearchParams] =  useSearchParams();

  const location = useLocation(); 

  const params = useParams();
  console.log(params.test)

  const test = decodeURI(location?.search)
  console.log(test)                         
  
  return (
    <div className="root">
      {/* 검정배경 메인영역 */}
      <div className='mainContainer'>
      </div>
      {/* 뉴스페이지 컨테이너 */}
      <div>
        {/* 제목 */}
        <div className='title'>
          <p className='newsTitle1'>{params.name} </p>
          <p className='newsTitle2'>관련뉴스예요</p>
        </div>
        {/* 관련도 높은순 뉴스 */}
        <div className='container'>
          <p className='detailTitle'>관련도 높은 뉴스</p>
          <div className='articleContainer'>
            <Article data={count} />
          </div>
        </div>

        {/* 최신순 뉴스 */}
        <div className='container'>
          <p className='detailTitle'>최신 뉴스</p>
          <div className='articleContainer'>
            <ArticleNew data={countNew} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail