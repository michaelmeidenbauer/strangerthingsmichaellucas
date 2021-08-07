import React, { useState } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Posts from './components/Posts';
import Register from './components/Register';
import Profile from './components/Profile';
import SinglePost from './components/SinglePost';
import Postform from './components/Postform';
import EditPost from './components/EditPost';
import Navigation from './components/Navigation';
import BAC from "./images/BAC.png";


function App() {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>
        <Switch>
          <Route exact path="/posts" component={Posts}/>
          <Route exact path="/posts/add" component={Postform}/>
          <Route exact path="/posts/:postID" component={SinglePost}/>
          <Route exact path="/posts/edit/:postID" component={EditPost}/>
          <Route path="/profile">
            {isLoggedIn ? <Profile isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/> : <Redirect to='/' />}
          </Route>
          <Route path="/login">
            <Login isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>
            <Register isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>
          </Route>
          <Route path="/">
            <header className="App-header">
              <h1>WELCOME TO THIS BOOTLEG-ASS CRAIGSLIST</h1>
              <img
              src={BAC}
              alt="logo"
              width="200px"
              height="auto"
              className="d-inline-block align-top"
            />
            </header>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
