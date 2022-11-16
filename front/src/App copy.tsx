import React from 'react';
import './components/css/App.css';
import Article from 'components/screens/Article';

function App() {
  return (
    <div className="root">
      {/* 뉴스이외영영 */}
      <div className='main'></div>

      {/* 뉴스 영역 배경 */}
      <div className='newsBg'>

        {/* 뉴스기사컨테이너 */}
        <div className='articleContainer'>
          <p className='title'>최근뉴스</p>
          {/* 뉴스컴포넌트 */}
          <Article/>
        </div>

      </div>

    </div>
  );
}

export default App;
