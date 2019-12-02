import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Sion from './Components/Sion';
import Sionple from './Components/Sionple';
import Sionnew from './Components/Sionnew';
import p from './Components/Perpon';
import ListSort from './Components/ListSort';
import AddTag from './Components/AddTag';
import UserDetails from './Components/UserDetails';
import Newperpon from './Components/Newperpon';


function App() {
  return (
    <Router>
      <div style={{backgroundColor:'#fff'}}>
          <Route exact path='/sign' component={Sign} />
          <Route exact path='/' component={Login} />
          <Route path='/sion' component={Sion}/>
          <Route path='/sionple' component={Sionple}/>
          <Route path='/sionnew' component={Sionnew}/>
          <Route path='/p' component={p}/>
          <Route path='/sort' component={ListSort}/>
          <Route path='/addTag' component={AddTag}/>
          <Route path='/details' component={UserDetails}/>
          <Route path='/newperpon' component={Newperpon}/>
      </div>
    </Router>
  );
}

export default App;
