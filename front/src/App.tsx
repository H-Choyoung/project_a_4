import React,{useState, useEffect} from 'react';
import './components/css/App.css';
import Article from 'components/screens/Article';
import axios from 'axios';

interface URL {
  url : string;
}
export interface PropsType {
  data : string
}

function App() {
  const [count, setCount] = useState<string>('삼성전자');
  const [title, setTitle] = useState<string>("삼성전자")

  useEffect(()=> {
    const getDatas = async () => {
      const datas = await axios.get(
        `http://127.0.0.1:8080/${count}`
      )
      setCount(datas.data)
      // console.log(datas.data)
    }
    getDatas()
  },[])
  console.log(count)

  return (
    <div className="root">
      <div>main</div>
      {/* 뉴스페이지 컨테이너 */}
      <div>
        {/* 제목 */}
        <div className='title'>
          <p>{title} 관련뉴스</p>
        </div>
        <div>
          <Article data={count} />
        </div>
      </div>
    </div>
  );
}

export default App;
