import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Posts from './components/Posts';

function App() {
  // const [isLoggedIn, updateIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/post">
            {/* <Post /> */}
          </Route>
          <Route path="/profile">
            {/* <Profile /> */}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            {/* <Register /> */}
          </Route>
          <Route path="/">
            {/* <Home /> */}
            <header className="App-header">
              <Navbar />
              <h1>MICHAEL AND LUCAS RULE</h1>
            </header>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
