import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';
import './App.css';

function App() {

  

  return (
    <>
      <Switch>
        <Route exact path='/' component={Join}/>
        <Route exact path='/chat/:user' component={Chat}/>
      </Switch>
    </>
  )
}

export default App
