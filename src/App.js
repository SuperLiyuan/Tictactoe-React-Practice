import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Game from './Game'
import Test from './Test'
import BasicLayout from './Layout'
import Reset from './Reset'
  class App extends Component {
    render() {
      return(
      <Router>
        <div>
        {/* 噢，要是在这里加route，跳转的时候这个组件就会在这个地方（Test link的下面）加载 */}
        <Route exact path="/test" component={Test}/>
        <Route exact path="/reset" component={Reset}/>
        <BasicLayout />
        </div>
      </Router>
      )
    } 
  }

  export default App;