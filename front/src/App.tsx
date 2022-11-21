import React,{useState, useEffect} from 'react';
import './components/css/App.css';
import Article from 'components/screens/Article';
import axios from 'axios';
import ArticleNew from 'components/screens/ArticleNew';
import {BiSearch} from  'react-icons/bi'

export interface Item {
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
  title: string;
}
export interface RootObject {
  display: number;
  items: Item[];
  lastBuildDate: string;
  start: number;
  total: number;
}

interface Proptypes {
  data : Item[];
}

interface GetDb {
  name : string;
}

interface DB {
  company : GetDb[]
}

function App() {
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
  const [title, setTitle] = useState<string>("")
  // const [title, setTitle] = useState<string>("") 
  // const onInput = (e:any) : void => {
    //   // console.log(e)
    // }
  const [getName, setGetName] = useState<DB>({
    company : []
  })

  const [check , setCheck] = useState<string[]>([])
  
  useEffect(()=> {
    const getDatas = async () => {
      const datas = await axios.get(
        `http://127.0.0.1:8080/${title}`
        )
        console.log(datas.data.name[0].name)
      setCount(datas.data.sim)
      // console.log(count)
      setCountNew(datas.data.date)
      // console.log(countNew)
      
      setGetName(datas.data.name)
      // console.log(datas.data.sim.items)
    }
    getDatas()
  },[])
  console.log(getName)
  return (
    // 루트
    <div className="root">
      {/* 검정배경 메인영역 */}
      <div className='mainContainer'>
        {/* 검색 컨테이너 */}
        <div className='searchArea'>
          <p>주식 매수매도 추천서비스</p>
          <div>
            <BiSearch size={24} className="searchIcon"/>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const input = await axios.get(
                `http://127.0.0.1:8080/${title}`
              )
              // console.log(input.data)
              setCount(input.data.sim)
              setCountNew(input.data.date)
            }}>
              <input
                className='input'
                onChange={(e)=> {
                // console.log(e.target.value)
                setTitle(e.target.value)
                // setCheck(()=>{
                //   getName
                // })
              }}
              type="text" 
              placeholder='종목 검색' 
              id="id" />
              <button className='inputButton'>검색하기</button>
            </form>
          </div>
        </div>

        {/* 테이블 컨테이너 */}
        <div className='tableContainer'>
          {/* 타이틀 */}
          <div className="stockInfoTitle">
            <p>주식 거래량 순위</p>
          </div>
          {/* 테이블영역 */}
          <div className="tableArea">
            <p>테이블 삽입영역</p>
          </div>
        </div>


      </div>
      {/* 뉴스페이지 컨테이너 */}
      <div>
        {/* 제목 */}
        <div className='title'>
          <p className='newsTitle'>{title} 관련뉴스예요</p>
        </div>

        <div className='container'>
          <p className='detailTitle'>관련도 높은 뉴스</p>
          <div className='articleContainer'>
            <Article data={count} />
          </div>
        </div>
        <div className='container'>
          <p className='detailTitle'>최신 뉴스</p>
          <div className='articleContainer'>
            <ArticleNew data={countNew} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
