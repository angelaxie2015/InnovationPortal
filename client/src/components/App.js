import './App.css';
import React from 'react';
import Login from './login/login.js'
import Register from './login/register.js'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">


      <BrowserRouter>
          
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <Route path='/'>
              <Redirect to='/' />
            </Route>
          </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
