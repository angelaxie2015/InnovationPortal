import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './login/login.js'
import Register from './login/register.js'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import UserContext from "./context/userContext.js"
import Axios from "axios"
function App() {
  const [user, setUser] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:8001/checkToken",
        null,
        { headers: { "x-auth-token": token} }
      );
    };

    checkLoggedIn();
  }, [])

  return (
    <div className="App">

      <BrowserRouter>
          <UserContext.Provider value={{user, setUser}}>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />

              <Route path='/'>
                <Redirect to='/' />
              </Route>
            </Switch>
          </UserContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
