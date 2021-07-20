import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Pages/Login';
import {Route,BrowserRouter as Router,Switch}from "react-router-dom"
import Chat from './Pages/Chat';

function App() {

  return<Router>
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/" component={Chat}/>
    </Switch>
  </Router> 
}

export default App;
