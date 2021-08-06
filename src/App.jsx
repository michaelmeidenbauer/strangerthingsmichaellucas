import React, { useState } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Profile from "./components/Profile";
import SinglePost from "./components/SinglePost";
import Postform from "./components/Postform";
import EditPost from "./components/EditPost";

function App() {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn} />

        <Switch>
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/add" component={Postform} />
          <Route exact path="/posts/:postID" component={SinglePost} />
          <Route exact path="/posts/edit/:postID" component={EditPost} />

          <Route path="/profile">
            {isLoggedIn ? (
              <Profile
                isLoggedIn={isLoggedIn}
                updateIsLoggedIn={updateIsLoggedIn}
              />
            ) : (
              <Redirect path="/" />
            )}
          </Route>

          <Route path="/login">
            <Login
              isLoggedIn={isLoggedIn}
              updateIsLoggedIn={updateIsLoggedIn}
            />
            <Register
              isLoggedIn={isLoggedIn}
              updateIsLoggedIn={updateIsLoggedIn}
            />
          </Route>

          <Route path="/register">{/* <Register /> */}</Route>

          <Route path="/">
            {/* <Home /> */}
            <header className="App-header">
              <h1>WELCOME TO THIS BOOTLEG-ASS CRAIGSLIST</h1>
            </header>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
