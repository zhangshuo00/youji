import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Sion from './Components/Sion';
import Sionple from './Components/Sionple';
import Sionnew from './Components/Sionnew';
import perpon from './Components/Perpon';
import Newperpon from './Components/Newperpon';
import ListSort from './Components/ListSort';
import AddTag from './Components/AddTag';
import UserDetails from './Components/UserDetails';
import MessageList from './Components/MessageList';
import PrivateLetter from './Components/PrivateLetter'



function App() {
  return (
    <Router>
      <div style={{backgroundColor:'#fff'}}>
          <Route exact path='/' component={Login} />
          <Route exact path='/sign' component={Sign} />
          {/* <Route exact path='/login' component={Login} /> */}
          <Route path='/sion' component={Sion}/>
          <Route path='/sionple' component={Sionple}/>
          <Route path='/sionnew' component={Sionnew}/>
          <Route path='/perpon' component={perpon}/>
          <Route path='/newperpon' component={Newperpon}/>
          <Route path='/sort' component={ListSort}/>
          <Route path='/addTag' component={AddTag}/>
          <Route path='/details' component={UserDetails}/>
          <Route path='/msg' component={MessageList}/>
          <Route path='/letter' component={PrivateLetter}/>
      </div>
    </Router>
  );
}

export default App;
