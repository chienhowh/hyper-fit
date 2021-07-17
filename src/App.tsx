import React from 'react';
import './App.css';
import { HomePage, RegisterPage, SchedulePage, SigninPage } from './pages';
import { HashRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/schedule/:scheduleId' component={SchedulePage}></Route>
          <Route path='/signin' component={SigninPage}></Route>
          <Route path='/register' component={RegisterPage}></Route>
          <Route render={()=> <h1>404 not found</h1>}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
