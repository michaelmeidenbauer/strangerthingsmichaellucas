import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import SinglePost from './components/SinglePost';
import Postform from './components/Postform';
import EditPost from './components/EditPost';

function App() {
  // const [isLoggedIn, updateIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/posts" component={Posts}/>
          <Route exact path="/posts/add" component={Postform}/>
          <Route exact path="/posts/:postID" component={SinglePost}/>
          <Route exact path="/posts/edit/:postID" component={EditPost}/>
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
