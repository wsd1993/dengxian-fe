import React from 'react'
// import CSSModules from 'react-css-modules'
import Actors from './actors/actor'
import Scenes from './scenes/scenes'
import Tools from './tools/tools'
import ActorInfo from './actorInfo/actorInfo'
import SceneInfo from './sceneInfo/sceneInfo'
import { HashRouter as Router, Route, Link } from "react-router-dom"

// import { Tabs } from 'antd'
import styles from './css/search.module.css'
// const { TabPane } = Tabs
class Searchpage extends React.Component {
  constructor (props) {
    super(props)
    this.callback = this.callback.bind(this)
  }
  callback (key) {
    console.log(key)
  }
  render() {
    return (
      <div className={ styles.searchPage }>
        <Router>
          <div className={ styles.header }>
            <Link className={ styles.tag } to="/actors">演员</Link>
            <Link className={ styles.tag } to="/scenes">场景</Link>
            <Link className={ styles.tag } to="/tools">工具</Link>
          </div>
          <Route exact path="/" component={ Actors }/>
          <Route exact path="/actors" component={ Actors } />
          <Route exact path="/actors/:id" component={ ActorInfo } />
          <Route exact path="/tools" component={ Tools } />
          <Route exact path="/scenes" component={ Scenes } />
          <Route exact path="/scenes/:id" component={ SceneInfo } />
        </Router>
      </div>
    )
  }
}

export default Searchpage