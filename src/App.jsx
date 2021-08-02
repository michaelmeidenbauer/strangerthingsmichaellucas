import React, { useState } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>
        <Switch>
          <Route exact path="/posts">
            <Posts />
          </Route>
          <Route exact path="/posts/add">
            <h1>ADD POST</h1>
          </Route>
          <Route path="/profile">
            <Profile isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>
          </Route>
          <Route path="/login">
            <Login isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>
            <Register isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>
          </Route>
          <Route path="/register">
            {/* <Register /> */}
          </Route>
          <Route path="/">
            {/* <Home /> */}
            <header className="App-header">
              <h1>MICHAEL AND LUCAS RULE</h1>
            </header>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
