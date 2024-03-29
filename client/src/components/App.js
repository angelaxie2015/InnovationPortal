import "./App.css";
//import EventDetails from './events/EventDetails';
import React, { useState, useEffect } from "react";
import Login from "./login/login.js";
import Register from "./login/register.js";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import UserContext from "./context/userContext.js";
import Axios from "axios";
import Events from "./events/Events";
import MyForm from "./contact/contact.js";
import NavBar from "./NavBar.js";
import FullScreenEvent from "./events/event/FullScreenEvent.js";
import Dashboard from "./dashboard/Dashboard";
import AddEvent from "./addevent/AddEvent";
import faq from "./faqpage/faqpage.js";
import PastEvents from "./pastevents/PastEvents.js";

function App() {
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "https://ufia.herokuapp.com/users/checkToken",
        null,
        { headers: { "x-auth-token": token } }
      );

      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await Axios.get("https://ufia.herokuapp.com/users/", {
          headers: { "x-auth-token": token },
        });
        setUser({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/contact" component={MyForm} />
            <Route path="/eventDetail" component={FullScreenEvent} />
            <Route path="/faqpage" component={faq} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/addEvent" component={AddEvent} />
            <Route path="/pastEvents" component={PastEvents} />
            <Route path="/" component={Events} />

            <Route path="/">
              <Redirect to="/" />
            </Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
