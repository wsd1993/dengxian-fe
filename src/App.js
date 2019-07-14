import React from 'react'
import Search from './pages/search/search'
import zhCN from 'antd/es/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import './App.css'

function App() {
  return (
    <div className="App">
      <LocaleProvider locale={zhCN}>
        <Search />
      </LocaleProvider>
    </div>
  );
}

export default App;
