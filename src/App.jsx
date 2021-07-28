import React from 'react';
import './App.css';
import Login from './components/Login';
import Postform from './components/Postform';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <h1>MICHAEL AND LUCAS RULE</h1>
        <Postform />
      </header>
    </div>
  );
}

export default App;
