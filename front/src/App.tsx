import React from 'react';
import './components/css/App.css';
import Article from 'components/screens/Article';

function App() {
  return (
    <div className="root">
      <div className='main'></div>
      <div className='newsBg'>
        <p className='title'>최근뉴스</p>
        <div className='articleContainer'>
          <Article/>
        </div>
      </div>

    </div>
  );
}

export default App;
