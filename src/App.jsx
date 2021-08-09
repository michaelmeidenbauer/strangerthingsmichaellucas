import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Posts from './components/Posts';
import Profile from './components/Profile';
import SinglePost from './components/SinglePost';
import Postform from './components/Postform';
import EditPost from './components/EditPost';
import Navigation from './components/Navigation';
import { getMyInfo } from './api/api';
import BACFullsize from './images/BAC-fullsize.png';


function App() {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [loggedInName, updateLoggedInName] = useState(null);

  useEffect(
    async () => {
      const localToken = JSON.parse(localStorage.getItem("strangersThingsToken"));
      if (localToken) {
        updateIsLoggedIn(true);
        const userInfo = await getMyInfo(localToken);
        const userName = userInfo.data.username;
        updateLoggedInName(userName);
      }
    },
    []
  );
  // eslint-disable-next-line no-unused-vars

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation
        isLoggedIn={isLoggedIn}
        updateIsLoggedIn={updateIsLoggedIn}
        loggedInName={loggedInName}
        updateLoggedInName={updateLoggedInName}/>
        <Switch>
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/add" component={Postform} />
          <Route exact path="/posts/:postID" component={SinglePost} />
          <Route exact path="/posts/edit/:postID" component={EditPost} />

          <Route path="/profile">
            {isLoggedIn ? <Profile isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/> : <Redirect to='/' />}
          </Route>

          <Route path="/login">
            <Login
            updateIsLoggedIn={updateIsLoggedIn}
            updateLoggedInName={updateLoggedInName}
            />
          </Route>
          <Route path="/">
            <header className="App-header">
            <img src={BACFullsize} className="App-logo mb-3" alt="welcome to bootleg-ass craigslist"/>
              <h1 className="mt-3">WELCOME TO BOOTLEG-ASS CRAIGSLIST</h1>
            </header>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
