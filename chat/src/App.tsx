import React, { useEffect, useState } from 'react';
import './App.css';
import ChatLog from './Pages/ChatLog';
import Login from './Pages/Login';
import {Route,BrowserRouter as Router,Switch}from "react-router-dom"

function App() {

  return<Router>
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/" component={ChatLog}/>
    </Switch>
  </Router> 
}

export default App;
