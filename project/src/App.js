import React from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Sion from './Components/Sion';
import Sionple from './Components/Sionple';
import Sionnew from './Components/Sionnew';
import Perpon from './Components/Perpon';
import Newperpon from './Components/Newperpon';
import ListSort from './Components/ListSort';
import AddTag from './Components/AddTag';
import UserDetails from './Components/UserDetails';
import MessageList from './Components/MessageList';
import PrivateLetter from './Components/PrivateLetter';
import Welcome from './Components/Welcome';
import Carousel from './Components/Carousel';
import Find from './Components/Find';
import Me from './Components/Me';
import Tag from './Components/Tag';
import Seach from './Components/Seach';
import Email from './Components/Email.js';
import New from './Components/new.js';



function App() {
  return (
    <Router basename="./index.html#">
      <div>
          <Route exact path='/' component={Welcome} />
          <Route path='/tag' component={Tag} />
          <Route path='/login' component={Login} />
          <Route exact path='/sign' component={Sign} />
          <Route path='/car' component={Carousel} />
          <Route path='/sion' component={Sion}/>
          <Route path='/sionple' component={Sionple}/>
          <Route path='/sionnew' component={Sionnew}/>
          <Route path='/perpon' component={Perpon}/>
          <Route path='/newperpon' component={Newperpon}/>
          <Route path='/sort' component={ListSort}/>
          <Route path='/addTag' component={AddTag}/>
          <Route path='/details' component={UserDetails}/>
          <Route path='/msg' component={MessageList}/>
          <Route path='/letter' component={PrivateLetter}/>
          <Route path='/find' component={Find}/>
          <Route path='/me' component={Me}/>
          <Route path='/seach' component={Seach}/>
	        <Route path='/session' component={Email}/>
          <Route path='/new' component={New}/>
      </div>
    </Router>
  );
}

export default App;
