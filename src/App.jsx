import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import SinglePost from './components/SinglePost';

function App() {
  // const [isLoggedIn, updateIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/posts" component={Posts}/>
          <Route exact path="/posts/add">
            <h1>ADD POST</h1>
          </Route>
          <Route path="/posts/:postID" component={SinglePost}/>
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
              <h1>MICHAEL AND LUCAS RULE</h1>
            </header>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
