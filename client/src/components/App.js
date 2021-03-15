import './App.css';
import React from 'react';
import Login from './login/login.js'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">




    <BrowserRouter>
        <Login />
        <Switch>
          <Route path='/login' component={Login}/>

          <Route path='/'>
            <Redirect to='/' />
          </Route>
        </Switch>
    </BrowserRouter>

    </div>
  );
}

export default App;
