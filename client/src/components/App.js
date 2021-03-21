import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './login/login.js'
import Register from './login/register.js'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import UserContext from "./context/userContext.js"
import Axios from "axios"
import LogNav from "./login/logNav.js"
import Events from './events/Events';


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
        "http://localhost:8001/users/checkToken",
        null,
        { headers: { "x-auth-token": token} }
      );

      console.log(tokenRes.data)
      if(tokenRes.data){
        const userRes = await Axios.get(
          "http://localhost:8001/users/",
          { headers: { "x-auth-token": token} }
        )
        setUser({
          token, 
          user: userRes.data
        })
      }

    };

    checkLoggedIn();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
          <UserContext.Provider value={{user, setUser}}>
            <LogNav />
            <Events/>
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
