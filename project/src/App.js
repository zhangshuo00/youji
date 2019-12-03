import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Sion from './Components/Sion';
import Sionple from './Components/Sionple';
import Sionnew from './Components/SionNew';
import perpon from './Components/Perpon';
import Newperpon from './Components/NewPerpon';



function App() {
  return (
    <Router>
      <div>
          <Route exact path='/sign' component={Sign} />
          <Route exact path='/login' component={Login} />
          <Route path='/sion' component={Sion}/>
          <Route path='/sionple' component={Sionple}/>
          <Route path='/sionnew' component={Sionnew}/>
          <Route path='/perpon' component={perpon}/>
          <Route path='/newperpon' component={Newperpon}/>


      </div>
    </Router>
  );
}

export default App;
