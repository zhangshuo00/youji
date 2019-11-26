import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Components/Login';
import ListSort from './Components/ListSort';

function App() {
  return (
    <Router>
      <div>
          <Route exact path='/' component={Login} />
          <Route path='/sort' component={ListSort}/>
      </div>
    </Router>
  );
}

export default App;
