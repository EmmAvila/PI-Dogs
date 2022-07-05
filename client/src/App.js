import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { Landing } from './Components/Landing';
import Home from './Components/Home';
import CreateDog from './Components/CreateDog';
import Detail from './Components/Detail';

function App() {

  
  return (
    <div className='App'>
      <Route exact path="/">
        <Landing/>
      </Route>

      <Route exact path='/home'>
        <Home/>
      </Route>

      <Route exact path='/create'>
      <CreateDog/>
      </Route>

      <Route exact path='/detail/:id'>
      <Detail/>
      </Route>


      
      
    </div>
  );
}

export default App;
