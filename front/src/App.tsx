import React,{useState, useEffect} from 'react';
import './components/css/App.css';
import Article from 'components/screens/Article';
import axios from 'axios';
import ArticleNew from 'components/screens/ArticleNew';

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
  const onInput = (e:any) : void => {
    console.log(e)
  }


  useEffect(()=> {
    const getDatas = async () => {
      const datas = await axios.get(
        `http://127.0.0.1:8080/${title}`
      )
      setCount(datas.data.sim)
      setCountNew(datas.data.date)
      // console.log(datas.data.sim.items)
    }
    getDatas()
  },[])

  return (
    <div className="root">
      <div>main
        <form onSubmit={async (e) => {
          e.preventDefault()
          const input = await axios.get(
            `http://127.0.0.1:8080/${title}`
          )
          console.log(input.data)
          setCount(input.data)
          setCountNew(input.data)
        }}>
          <input onChange={(e)=> {
            console.log(e.target.value)
            setTitle(e.target.value)
          }}
          type="text" 
          
          placeholder='종목 검색' 
          id="id" />
          <button>검색하기</button>
        </form>
      </div>
      {/* 뉴스페이지 컨테이너 */}
      <div>
        {/* 제목 */}
        <div className='title'>
          <p>{title} 관련뉴스</p>
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
