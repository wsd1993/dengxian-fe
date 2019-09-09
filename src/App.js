import React from 'react'
import Search from './pages/search/search'
import zhCN from 'antd/es/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import store from './store'
import { Provider } from 'react-redux'
import './App.css'

function App() {
  return (
    <div className="App">
      <LocaleProvider locale={zhCN}>
        <Provider store={store}>
          <Search />
        </Provider>
      </LocaleProvider>
    </div>
  );
}

export default App;
